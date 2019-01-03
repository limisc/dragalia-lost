import os
import re
import json
import io
import requests
from bs4 import BeautifulSoup
import urllib.request


def get_cargoquery_url(cargo_table, param):
    API = \
        'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables='
    table = cargo_table.capitalize()
    return '%s%ss&fields=%s' % (API, table, param)


def get_data(url):
    try:
        response = requests.get(url).json()
        if 'error' in response.keys():
            raise Exception
        return response
    except Exception:
        print(response['error'])


def get_json(file):
    with open(file, 'r') as f:
        content = f.read()
        data = content[content.find('{'):content.rfind('}') + 1]
    return json.loads(data)


def get_limit():
    file_path = os.path.join(os.path.dirname(__file__),
                             'src/redux/actions/limit.js')
    return get_json(file_path)


def get_stats_limit(limit, section, rarity, unbind=4):
    if section == 'adventurer' or section == 'mana':
        return limit[section][rarity]
    else:
        return limit[section][rarity][unbind]


def save_file(data, section, file_type='data'):
    if file_type == 'data':
        path = 'src/components/calcStats/settingPanel/data'
    else:
        path = 'src/redux/actions/internationlization'
    file = os.path.join(os.path.dirname(__file__), path, section + '.js')

    with open(file, mode='w', encoding='utf-8') as f:
        f.write('const %s = \n' % section)
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(';\n')
        f.write('export default %s;' % section)


def get_name(section):
    file_path = os.path.join(os.path.dirname(
        __file__), 'src/redux/actions/internationlization', section + '.js')
    return get_json(file_path)


def set_name(name_dict, id, Name):
    if (id in name_dict):
        name = name_dict[id]
    else:
        name = {"en": Name, "zh": "", "ja": ""}
        name_dict[id] = name
        print(id, Name)
    return name


def set_data(section, param, replace, omit, limit):
    url = get_cargoquery_url(section, param)
    raw_data = get_data(url)

    item_list = []
    duplicate_check = []

    id = param.split(",", 1)[0]
    names = get_name(section)
    abilities = get_abilities() if section == "dragon" else None

    for i in raw_data["cargoquery"]:
        item = i["title"]
        item["image"] = set_image(section, item)
        if item[id] != "" and item["image"] not in duplicate_check and int(item["Rarity"]) >= 3:
            item.update(set_updates(section, item, abilities))
            kv = list(item.items())
            item.clear()
            for k, v in kv:
                if "Hp" in k:
                    item[k.replace("Hp", "HP")] = int(v)
                elif "Atk" in k:
                    item[k.replace("Atk", "STR")] = int(v)
                elif k in replace:
                    item[replace[k]] = v
                elif "Name" in k:
                    item[k.replace(k, "Name")] = set_name(names, item["Id"], v)
                elif k in omit:
                    pass
                else:
                    item[k] = v
            item_list.append(item)
            duplicate_check.append(item["image"])
    save_file(item_list, section)
    save_file(names, section, "intl")


def set_adventurer(limit):
    param = "Id,Name,WeaponType,Rarity,ElementalType,VariationId," + \
            "MinHp3,MinHp4,MinHp5,MaxHp,PlusHp0,PlusHp1,PlusHp2,PlusHp3,PlusHp4,McFullBonusHp5," + \
            "MinAtk3,MinAtk4,MinAtk5,MaxAtk,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5"
    replace = {
        "Rarity": "rarity",
        "WeaponType": "type",
        "ElementalType": "element"
    }
    omit = ["VariationId"]
    set_data("adventurer", param, replace, omit, limit)


def set_weapon(limit):
    param = 'Id,BaseId,FormId,WeaponName,Type,Rarity,ElementalType,CraftNodeId,MinHp,MaxHp,MinAtk,MaxAtk'
    replace = {"Type": "type", "Rarity": "rarity", "ElementalType": "element"}
    omit = ["BaseId", "FormId", "CraftNodeId"]

    set_data("weapon", param, replace, omit, limit)


def set_wyrmprint(limit):
    param = 'BaseId,Name,Rarity,MinHp,MaxHp,MinAtk,MaxAtk'
    replace = {"BaseId": "Id", "Rarity": "rarity"}
    omit = []

    set_data("wyrmprint", param, replace, omit, limit)


def get_abilities():
    ability_param = "Id,Details"
    url = get_cargoquery_url("abilitie", ability_param)
    raw_data = get_data(url)
    abilities = {}
    for i in raw_data["cargoquery"]:
        id = i["title"]["Id"]
        s = i["title"]["Details"]
        r1 = re.search("(?i)Flame|Water|Wind|Light|Shadow", s)
        if r1:
            try:
                if re.search("(?i)Strength|HP", s):
                    ability = {"HP": 0, "STR": 0}
                    r2 = re.search("(?i)Strength", s)
                    if r2:
                        value = re.search(
                            "([-]?\d+)%", s[r2.start():]).group(1)
                        ability["STR"] = int(value)
                    r3 = re.search("(?i)HP", s)
                    if r3:
                        value = re.search(
                            "([-]?\d+)%", s[r3.start():]).group(1)
                        ability["HP"] = int(value)
                    abilities[id] = ability
            except:
                pass
    return abilities


def set_dragon(limit):
    param = "Id,BaseId,Name,ElementalType,Rarity," + \
            "MinHp,MaxHp,MinAtk,MaxAtk,Abilities11,Abilities12"

    replace = {"ElementalType": "element", "Rarity": "rarity"}
    omit = ["BaseId"]

    set_data("dragon", param, replace, omit, limit)


def set_image(section, item):
    if section == "adventurer":
        return "%s_0%s_r0%s.png" % (item["Id"], item["VariationId"], item["Rarity"])
    elif section == "weapon":
        return "%s_01_%s.png" % (item["BaseId"], item["FormId"])
    else:
        return "%s_01.png" % item["BaseId"]


def set_updates(section, item, abilities=None):
    updates = {}

    if section == "adventurer":
        updates.update({
            "level": 80,
            "MAX_LEVEL": 80,
            "mana": "45",
            "curRarity": "5"
        })
    else:
        level = get_stats_limit(limit, section, item["Rarity"])
        updates.update({
            "level": level,
            "MAX_LEVEL": level,
            "unbind": 4
        })

    if section == "weapon":
        element = ["Flame", "Water", "Wind", "Light", "Shadow"]
        if item["ElementalType"] in element:
            updates["tier"] = "3"
        elif item["CraftNodeId"] == "":
            updates["tier"] = "1"
        else:
            updates["tier"] = str(item["CraftNodeId"])[0]
    elif section == "dragon":
        if (item["Abilities11"] in abilities):
            updates["Abilities11"] = abilities[item["Abilities11"]]
            updates["Abilities12"] = abilities[item["Abilities12"]]
        else:
            default = {"HP": 0, "STR": 0}
            updates["Abilities11"] = default
            updates["Abilities12"] = default

    return updates


if __name__ == "__main__":
    limit = get_limit()
    # set_adventurer(limit)
    set_weapon(limit)
    # set_wyrmprint(limit)
    # set_dragon(limit)
