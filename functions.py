import os
import re
import json
from collections import OrderedDict
# import io
import requests
# from bs4 import BeautifulSoup
# import urllib.request


def get_cargoquery_url(cargo_table, param):
    API = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables='
    table = cargo_table[0].upper() + cargo_table[1:]
    return '%s%ss&fields=%s' % (API, table, param)


def get_data(cargo_table, param):
    url = get_cargoquery_url(cargo_table, param)
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


def save_file(data, section, file_type='data'):
    if file_type == 'data':
        path = 'src/data'
    else:
        path = 'src/intl'
    file = os.path.join(os.path.dirname(__file__), path, section + '.js')

    with open(file, mode='w', encoding='utf-8') as f:
        f.write('const %s = \n' % section)
        if file_type == "intl":
            json.dump(data, f, indent=2, ensure_ascii=False, sort_keys=True)
        else:
            json.dump(data, f, indent=2, ensure_ascii=False)
        f.write(';\n')
        f.write('export default %s;' % section)
    print("Save file: {}".format(file))


def print_data(data):
    data = json.dumps(data, ensure_ascii=False, indent=2)
    print(data)


def get_limit():
    file_path = os.path.join(os.path.dirname(__file__), 'src/data/limit.js')
    return get_json(file_path)


def get_stats_limit(section, rarity, unbind=4):
    if section == 'adventurer' or section == 'mana':
        return limit[section][rarity]
    else:
        return limit[section][rarity][unbind]


def get_name(section):
    file_path = os.path.join(os.path.dirname(
        __file__), 'src/intl', section + '.js')
    return get_json(file_path)


def set_name(name_dict, item, section):
    id = item["BaseId"] if section == "wyrmprint" else item["Id"]
    if id in name_dict:
        name = dict(name_dict[id])
        for lang in ["ja", "zh"]:
            if name[lang] == "":
                name[lang] = name["en"]
    else:
        if "Name" in item:
            name_en = item["Name"]
        elif "WeaponName" in item:
            name_en = item["WeaponName"]
        else:
            name_en = ""

        name_ja = item["NameJP"] if "NameJP" in item else name_en
        name = {"en": name_en, "zh": name_en, "ja": name_ja}
        name_dict[id] = {"en": name_en, "zh": "",
                         "ja": item["NameJP"] if "NameJP" in item else ""}
        print("{} - en: {:<30} jp: {}".format(id, name_en, name_ja))
    return name


def get_checkId(section, item):
    if section == "adventurer":
        return "{}_0{}_r0".format(item["Id"], item["VariationId"])
    elif section == "weapon":
        return "{}_01_{}".format(item["BaseId"], item["FormId"])
    elif section == "dragon":
        return "{}_01".format(item["BaseId"])
    else:
        return "{}_0".format(item["BaseId"])


def get_abilities(table):
    param = "Id,Details,PartyPowerWeight"
    data = get_data(table, param)["cargoquery"]
    results = {}
    for i in data:
        item = i["title"]
        results[item["Id"]] = {
            "Details": item["Details"],
            "Might": item["PartyPowerWeight"]
        }
        # if "damage taken" in item["Details"]:
        #     print("{}: {}".format(item["Id"], item["Details"]))
        r1 = re.search("(?i)Flame|Water|Wind|Light|Shadow", d)
    return results


def set_abilities(section, item):
    results = {}
    ability_set = ["Abilities11", "Abilities12", "Abilities21",
                   "Abilities22", "Abilities31", "Abilities32"]

    coAbility_set = ["ExAbilityData1", "ExAbilityData2",
                     "ExAbilityData3", "ExAbilityData4",
                     "ExAbilityData5"]

    for a in ability_set:
        if a in item:
            if item[a] in abilities:
                # if "damage taken" in
                results[a] = abilities[item[a]]["Might"]
            else:
                up = a[:-1] + "1"
                results[a] = results[up] if up in results else "0"

    if section == "adventurer":
        for c in coAbility_set:
            if c in item:
                if item[c] in coAbilities:
                    results[c] = coAbilities[item[c]]["Might"]
                else:
                    up = c[:-1] + "1"
                    results[c] = results[up] if up in results else "0"
        results.update({
            "MAX_LEVEL": 80,
            "level": 80,
            "mana": "50",
            "curRarity": "5"
        })
    else:
        if section == "weapon":
            element = ["Flame", "Water", "Wind", "Light", "Shadow"]
            if item["ElementalType"] in element:
                results["tier"] = "3"
            elif item["CraftNodeId"] == "":
                results["tier"] = "1"
            else:
                results["tier"] = str(item["CraftNodeId"])[0]
        elif section == "dragon":
            for i, v in enumerate(["Abilities11", "Abilities12"], start=1):
                HP = 0
                STR = 0
                if item[v] in abilities:
                    d = abilities[item[v]]["Details"]
                    r1 = re.search("(?i)Flame|Water|Wind|Light|Shadow", d)
                    if r1:
                        if re.search("(?i)Strength|HP", d):
                            r2 = re.search("(?i)strength", d)
                            if r2:
                                STR = re.search(
                                    "(\d+)%", d[r2.start():]).group(1)
                            r3 = re.search("(?i)HP", d)
                            if r3:
                                HP = re.search(
                                    "(\d+)%", d[r3.start():]).group(1)
                results["ability"+str(i)] = {"HP": int(HP), "STR": int(STR)}

        level = get_stats_limit(section, item["Rarity"])
        results.update({
            "level": level,
            "MAX_LEVEL": level,
            "unbind": "4"
        })

    return results


def set_adventurer():
    param = "Id,Name,NameJP,WeaponType,Rarity,ElementalType,VariationId," + \
            "MinHp3,MinHp4,MinHp5,MaxHp,PlusHp0,PlusHp1,PlusHp2,PlusHp3,PlusHp4,McFullBonusHp5," + \
            "MinAtk3,MinAtk4,MinAtk5,MaxAtk,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5," + \
            "DefCoef,Abilities11,Abilities12,Abilities21,Abilities22,Abilities31,Abilities32," + \
            "ExAbilityData1,ExAbilityData2,ExAbilityData3,ExAbilityData4,ExAbilityData5"
    replace = {
        "Rarity": "rarity",
        "WeaponType": "type",
        "ElementalType": "element"
    }
    omit = ["NameJP", "VariationId"]

    set_data("adventurer", param, replace, omit)


def set_weapon():
    param = "Id,BaseId,FormId,WeaponName,Type,Rarity,ElementalType,CraftNodeId,MinHp,MaxHp,MinAtk,MaxAtk"
    keep_str = []
    replace = {
        "Type": "type",
        "Rarity": "rarity",
        "ElementalType": "element"
    }
    omit = ["BaseId", "FormId", "CraftNodeId"]
    set_data("weapon", param, replace, omit)


def set_wyrmprint():
    param = 'BaseId,Name,NameJP,Rarity,MinHp,MaxHp,MinAtk,MaxAtk,' + \
            "Abilities11,Abilities12,Abilities21,Abilities22,Abilities31,Abilities32"
    replace = {"Rarity": "rarity"}
    omit = ["NameJP"]
    set_data("wyrmprint", param, replace, omit)


def set_dragon():
    param = "Id,BaseId,Name,ElementalType,Rarity," + \
            "MinHp,MaxHp,MinAtk,MaxAtk,Abilities11,Abilities12"
    replace = {"ElementalType": "element", "Rarity": "rarity"}
    omit = ["BaseId"]
    set_data("dragon", param, replace, omit)


def set_data(section, param, replace, omit):
    item_list = []
    duplicate_check = []
    keep_str = ["tier", "curRarity", "mana"]
    Id = "BaseId" if section == "wyrmprint" else "Id"
    names = get_name(section)
    o_len = len(names)
    data = get_data(section, param)["cargoquery"]
    for d in data:
        item = d["title"]
        check_Id = get_checkId(section, item)
        if item[Id].isdigit() and check_Id not in duplicate_check and int(item["Rarity"]) >= 3:
            duplicate_check.append(check_Id)
            item.update(set_abilities(section, item))
            r_item = {}
            for k, v in item.items():
                if k in omit:
                    pass
                elif k == Id:
                    r_item["Id"] = check_Id
                elif "Name" in k:
                    r_item["Name"] = set_name(names, item, section)
                elif k in replace:
                    r_item[replace[k]] = v
                elif k in keep_str:
                    r_item[k] = str(v)
                elif isinstance(v, str) and v.isdigit():
                    r_item[k] = int(v)
                else:
                    r_item[k] = v
            item_list.append(r_item)
    save_file(item_list, section)
    if len(names) > o_len:
        save_file(names, section, "intl")


if __name__ == "__main__":
    # limit = get_limit()
    # abilities = get_abilities("abilitie")
    # coAbilities = get_abilities("coAbilitie")
    # set_adventurer()
    # set_weapon()
    # set_wyrmprint()
    # set_dragon()
