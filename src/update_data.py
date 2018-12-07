import os
import re
import math
import json
import requests
from bs4 import BeautifulSoup
import urllib.request

API_EN = "https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables="
API_ZH = "https://dragalialost-zh.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables="


def img_path(file_folder, file_name):
    return os.path.join(os.path.dirname(__file__), "..", "public", "img", file_folder, file_name)


def save_file(data, const_name, file_name):
    save_path = os.path.join(os.path.dirname(__file__), 'redux', 'store', file_name)
    formatted_json = json.dumps(data, indent=2)

    try:
        with open(save_path, 'w') as f:
            f.write('const %s = \n' % const_name)
            f.write(formatted_json)
            f.write(';\n')
            f.write('export default %s;' % const_name)
    except Exception as e:
        print(repr(e))


def get_cargoquery_url(region, cargo_table, param):
    return region + cargo_table + "&fields=" + param


def update_adventurers_data():
    adventurers = []
    param = 'Id,Name,WeaponType,Rarity,ElementalType,VariationId,' + \
            'MinHp3,MinHp4,MinHp5,MaxHp,PlusHp0,PlusHp1,PlusHp2,PlusHp3,PlusHp4,McFullBonusHp5,' + \
            'MinAtk3,MinAtk4,MinAtk5,MaxAtk,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5'
    url = get_cargoquery_url(API_EN, "Adventurers", param)

    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data['cargoquery']:
        adventurer = i['title']
        if adventurer['Id'] != "":
            adventurer['Id'] = "%s_0%s" % (adventurer['Id'], adventurer.pop('VariationId', None))
            if not any(a['Id'] == adventurer['Id'] for a in adventurers):
                kv = list(adventurer.items())
                adventurer.clear()

                for k, v in kv:
                    if "Hp" in k:
                        adventurer[k.replace("Hp", "HP")] = int(v)
                    elif "Atk" in k:
                        adventurer[k.replace("Atk", "STR")] = int(v)
                    elif k == "WeaponType":
                        adventurer['type'] = v
                    elif k == "Rarity":
                        adventurer["rarity"] = v
                    elif k == "ElementalType":
                        adventurer["element"] = v
                    else:
                        adventurer[k] = v

                adventurer['MAX_LEVEL'] = 80
                adventurers.append(adventurer)
    save_file(adventurers, 'adventurer', 'adventurer_data.js')


def update_weapons_data():
    weapons = []
    MAX_LEVEL = {"3": 40, "4": 70, "5": 100}

    param = 'Id,BaseId,FormId,WeaponName,Type,Rarity,ElementalType,' + \
        'CraftNodeId,ParentCraftNodeId,CraftGroupId,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,' + \
        'AssembleCoin,' + \
        'CraftMaterial1,CraftMaterialQuantity1,' + \
        'CraftMaterial2,CraftMaterialQuantity2,' + \
        'CraftMaterial3,CraftMaterialQuantity3,' + \
        'CraftMaterial4,CraftMaterialQuantity4,' + \
        'CraftMaterial5,CraftMaterialQuantity5'
    url = get_cargoquery_url(API_EN, "Weapons", param)
    raw_data = requests.get(url=url).json()['cargoquery']
    for i in raw_data:
        weapon = i['title']
        if weapon['Id'] != "" and (not any(w['Id'] == weapon['Id'] for w in weapons)) and int(i['title']['Rarity']) >= 3:
            weapon['img'] = "%s_01_%s.png" % (weapon.pop('BaseId', None), weapon.pop('FormId', None))

            kv = list(weapon.items())
            weapon.clear()

            for k, v in kv:
                if "Hp" in k:
                    weapon[k.replace("Hp", "HP")] = int(v)
                elif "Atk" in k:
                    weapon[k.replace("Atk", "STR")] = int(v)
                elif k == "WeaponName":
                    weapon["Name"] = v
                elif k == "ElementalType":
                    weapon["element"] = v
                elif k in ["Type", "Rarity"]:
                    weapon[k.lower()] = v
                else:
                    try:
                        weapon[k] = int(v)
                    except Exception:
                        weapon[k] = v
            weapon['tier'] = str(weapon['CraftNodeId'])[0] if weapon['CraftNodeId'] else "0"
            weapon["MAX_LEVEL"] = MAX_LEVEL[weapon['rarity']]
            weapons.append(weapon)

    save_file(weapons, 'weapon', 'weapon_data.js')


def update_dragons_data():
    ability_param = 'Id,Name'
    url = get_cargoquery_url(API_ZH, "Abilities", ability_param)
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))
    abilities = {}
    for i in raw_data['cargoquery']:
        result = re.search('\((Flame|Water|Wind|Light|Shadow)\) (.*) \+(\d*)%', i['title']['Name'])
        if (i['title']['Id'] not in abilities.keys()) and result:
            ability = {}
            ability['attr'] = "both" if "&" in result.group(2) else result.group(2)
            ability['value'] = int(result.group(3))
            abilities[i['title']['Id']] = ability

    dragons = []
    MAX_LEVEL = {"3": 60, "4": 80, "5": 100}

    param = 'BaseId,Id,Name,ElementalType,' + \
        'Rarity,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,' + \
        'Abilities11,Abilities12'
    # ,VariationId
    url = get_cargoquery_url(API_EN, 'Dragons', param)
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data['cargoquery']:
        dragon = i['title']
        if dragon['Id'] != "" and (not any(d['Id'] == dragon['Id'] for d in dragons)):
            dragon['img'] = dragon.pop('BaseId', None) + "_01.png"
            dragon['Abilities11'] = abilities[dragon['Abilities11']]
            dragon['Abilities12'] = abilities[dragon['Abilities12']]
            kv = list(dragon.items())
            dragon.clear()

            for k, v in kv:
                if "Hp" in k:
                    dragon[k.replace("Hp", "HP")] = int(v)
                elif "Atk" in k:
                    dragon[k.replace("Atk", "STR")] = int(v)
                elif k == "Rarity":
                    dragon["rarity"] = v
                elif k == "ElementalType":
                    dragon["element"] = v
                else:
                    try:
                        dragon[k] = int(v)
                    except Exception:
                        dragon[k] = v
            dragon["MAX_LEVEL"] = MAX_LEVEL[dragon['rarity']]
            dragons.append(dragon)
    save_file(dragons, 'dragon', 'dragon_data.js')


def update_wyrmprints_data():
    wyrmprints = []
    MAX_LEVEL = {"2": 30, "3": 60, "4": 80, "5": 100}

    param = 'BaseId,Name,Rarity,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk'
    url = get_cargoquery_url(API_EN, 'Wyrmprints', param)
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data['cargoquery']:
        wyrmprint = i['title']
        if wyrmprint['BaseId'] != "" and (not any(w['Id'] == wyrmprint['BaseId'] for w in wyrmprints)):
            kv = list(wyrmprint.items())
            wyrmprint.clear()

            for k, v in kv:
                if k == "BaseId":
                    wyrmprint["Id"] = v
                elif "Hp" in k:
                    wyrmprint[k.replace("Hp", "HP")] = int(v)
                elif "Atk" in k:
                    wyrmprint[k.replace("Atk", "STR")] = int(v)
                elif k == "Rarity":
                    wyrmprint["rarity"] = v
                else:
                    try:
                        wyrmprint[k] = int(v)
                    except Exception:
                        wyrmprint[k] = v
            wyrmprint["MAX_LEVEL"] = MAX_LEVEL[wyrmprint['rarity']]
            wyrmprints.append(wyrmprint)
    save_file(wyrmprints, 'wyrmprint', 'wyrmprint_data.js')


def update_materials_data():
    materials = []
    param = 'Id,Name'
    url = API_ZH + "Materials" + "&fields=" + param

    try:
        raw_data = requests.get(url=url).json()['cargoquery']
        for material in raw_data:
            new_material = material['title']
            materials.append(new_material)

        save_file(materials, 'materials', 'material_data.js')
    except Exception as e:
        print(repr(e))


def download_adventurer_img():
    # url="https://dragalialost.gamepedia.com/api.php?action=query&format=json&prop=&list=allimages&aifrom=100001_01_r04.png&aiprop=timestamp%7Curl&ailimit=max"
    url="https://dragalialost.gamepedia.com/api.php?action=query&format=json&prop=&list=allimages&aifrom=110254_01_r04_portrait.png&aiprop=timestamp%7Curl&ailimit=max"
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data["query"]["allimages"]:
        if(re.match('\d{6}_\d{2}_r0\d.png', i['name'])):
            urllib.request.urlretrieve(i["url"], img_path("adventurer", i["name"]))


# def download_wyrmprint_img():
#     try:
#         url = "https://dragalialost.gamepedia.com/Wyrmprint_List"
#         response = requests.get(url)
#         soup = BeautifulSoup(response.text, 'html.parser')
#         img_tags = soup.find_all('img', alt=True)

#         wyrmprint_imgs = {i['alt']: i['src']
#                           for i in img_tags if re.match('\d{6} \d{2}.png', i['alt'])}
#         for key, value in wyrmprint_imgs.items():
#             urllib.request.urlretrieve(value, img_path("wyrmprint", key))

#     except Exception as e:
#         print(repr(e))


def download_dragon_img():
    try:
        url = "https://dragalialost.gamepedia.com/Dragon_List"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img', alt=True)

        dragon_imgs = {i['alt']: i['src']
                       for i in img_tags if re.match('\d{6} \d{2}.png', i['alt'])}
        for key, value in dragon_imgs.items():
            urllib.request.urlretrieve(value, img_path("dragon", key))

    except Exception as e:
        print(repr(e))


def download_weapon_img():
    url="https://dragalialost.gamepedia.com/api.php?action=query&format=json&prop=&list=allimages&aifrom=301001_01_19901.png&aiprop=timestamp%7Curl&ailimit=max"
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data["query"]["allimages"]:
        urllib.request.urlretrieve(i["url"], img_path("weapon", i["name"]))

def download_wyrmprint_img():
    url="https://dragalialost.gamepedia.com/api.php?action=query&format=json&prop=&list=allimages&aifrom=400001_01.png&aiprop=timestamp%7Curl&ailimit=max"
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data["query"]["allimages"]:
        if(re.match('\d{6}_\d{2}.png', i['name'])):
            urllib.request.urlretrieve(i["url"], img_path("wyrmprint", i["name"]))

def download_dragon_img():
    url="https://dragalialost.gamepedia.com/api.php?action=query&format=json&prop=&list=allimages&aifrom=210001_01.png&aiprop=timestamp%7Curl&ailimit=max"
    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data["query"]["allimages"]:
        if(re.match('\d{6}_\d{2}.png', i['name'])):
            urllib.request.urlretrieve(i["url"], img_path("dragon", i["name"]))
        elif (i['name'] == "2_Unbind.png"):
            break;


if __name__ == "__main__":
    update_wyrmprints_data()