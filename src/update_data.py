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
    save_path = os.path.join(os.path.dirname(
        __file__), 'components', 'data', file_name)
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
    level_dict = {
        "3": 60,
        "4": 70,
        "5": 80,
    }
    param = 'Id,Name,WeaponType,Rarity,ElementalType,VariationId,' + \
            'MinHp3,MinHp4,MinHp5,MaxHp,PlusHp0,PlusHp1,PlusHp2,PlusHp3,PlusHp4,McFullBonusHp5,' + \
            'MinAtk3,MinAtk4,MinAtk5,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5'
    url = get_cargoquery_url(API_EN, "Adventurers", param)

    try:
        raw_data = requests.get(url=url).json()
    except Exception as e:
        print(repr(e))

    for i in raw_data['cargoquery']:
        adventurer = i['title']
        if adventurer['Id'] != "":
            adventurer['Id'] = "%s 0%s r0%s" % (adventurer['Id'], adventurer.pop(
                'VariationId', None), adventurer['Rarity'])
            if not any(a['Id'] == adventurer['Id'] for a in adventurers):
                for k, v in adventurer.items():
                    if k != "Rarity":
                        try:
                            adventurer[k] = int(v)
                        except Exception:
                            pass
                adventurer['type'] = adventurer.pop('WeaponType', None)
                adventurer['rarity'] = adventurer.pop('Rarity', None)
                adventurer['element'] = adventurer.pop('ElementalType', None)
                adventurer['img'] = adventurer['Id'] + ".png"
                adventurer['LEVEL_LIMIT'] = level_dict
                adventurer['MAX_LEVEL'] = 80
                adventurers.append(adventurer)
    save_file(adventurers, 'adventurer', 'adventurer_data.js')


def update_weapons_data():
    weapons = []
    level_dict = {
        "3": {
            0: 20,
            1: 25,
            2: 30,
            3: 35,
            4: 40,
        },
        "4": {
            0: 50,
            1: 55,
            2: 60,
            3: 65,
            4: 70,
        },
        "5": {
            0: 80,
            1: 85,
            2: 90,
            3: 95,
            4: 100,
        }
    }
    param = 'Id,BaseId,FormId,WeaponName,Type,Rarity,ElementalType,' + \
        'CraftNodeId,ParentCraftNodeId,CraftGroupId,' + \
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
            weapon['img'] = "%s_01_%s.png" % (weapon.pop(
                'BaseId', None), weapon.pop('FormId', None))
            for k, v in weapon.items():
                if k not in ["Id", "Rarity"]:
                    try:
                        weapon[k] = int(v)
                    except ValueError:
                        pass
            weapon['Name'] = weapon.pop('WeaponName', None)
            weapon['type'] = weapon.pop('Type', None)
            weapon['element'] = weapon.pop('ElementalType', None)
            weapon['rarity'] = weapon.pop('Rarity', None)
            weapon['tier'] = str(math.floor(
                weapon['CraftNodeId'] / 100)) if weapon['CraftNodeId'] else "0"
            weapon["LEVEL_LIMIT"] = level_dict[weapon['rarity']]
            weapon["MAX_LEVEL"] = level_dict[weapon['rarity']][4]
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
        result = re.search(
            '\((Flame|Water|Wind|Light|Shadow)\) (.*) \+(\d*)%', i['title']['Name'])
        if (i['title']['Id'] not in abilities.keys()) and result:
            ability = {}
            ability['attr'] = "both" if "&" in result.group(
                2) else result.group(2)
            ability['value'] = int(result.group(3))
            abilities[i['title']['Id']] = ability

    dragons = []
    level_dict = {
        "3": {
            0: 20,
            1: 30,
            2: 40,
            3: 50,
            4: 60,
        },
        "4": {
            0: 30,
            1: 40,
            2: 50,
            3: 65,
            4: 80,
        },
        "5": {
            0: 40,
            1: 55,
            2: 70,
            3: 85,
            4: 100,
        }
    }
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
            dragon['img'] = dragon.pop('BaseId', None) + " 01.png"
            dragon['Abilities11'] = abilities[dragon['Abilities11']]
            dragon['Abilities12'] = abilities[dragon['Abilities12']]
            for k, v in dragon.items():
                if k not in ["Id", "Rarity"]:
                    try:
                        dragon[k] = int(v)
                    except Exception:
                        pass
            dragon['rarity'] = dragon.pop('Rarity', None)
            dragon['element'] = dragon.pop('ElementalType', None)
            dragon["LEVEL_LIMIT"] = level_dict[dragon['rarity']]
            dragon["MAX_LEVEL"] = level_dict[dragon['rarity']][4]
            dragons.append(dragon)
    save_file(dragons, 'dragon', 'dragon_data.js')


def update_wyrmprints_data():
    wyrmprints = []
    level_dict = {
        "2": {
            0: 10,
            1: 15,
            2: 20,
            3: 25,
            4: 30,
        },
        "3": {
            0: 20,
            1: 30,
            2: 40,
            3: 50,
            4: 60,
        },
        "4": {
            0: 30,
            1: 40,
            2: 50,
            3: 65,
            4: 80,
        },
        "5": {
            0: 40,
            1: 55,
            2: 70,
            3: 85,
            4: 100,
        }
    }
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
            wyrmprint['Id'] = wyrmprint.pop('BaseId', None)
            wyrmprint['img'] = wyrmprint['Id'] + " 01.png"
            for k, v in wyrmprint.items():
                if k not in ["Id", "Rarity"]:
                    try:
                        wyrmprint[k] = int(v)
                    except Exception:
                        pass
            wyrmprint['rarity'] = wyrmprint.pop('Rarity', None)
            wyrmprint["LEVEL_LIMIT"] = level_dict[wyrmprint['rarity']]
            wyrmprint["MAX_LEVEL"] = level_dict[wyrmprint['rarity']][4]
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
    try:
        url = "https://dragalialost.gamepedia.com/Character_List"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img', alt=True)

        adventurer_imgs = {i['alt']: i['src']
                           for i in img_tags if re.match('\d{6} \d{2} r\d{2}.png', i['alt'])}
        for key, value in adventurer_imgs.items():
            urllib.request.urlretrieve(value, img_path("adventurer", key))

    except Exception as e:
        print(repr(e))


def download_wyrmprint_img():
    try:
        url = "https://dragalialost.gamepedia.com/Wyrmprint_List"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img', alt=True)

        wyrmprint_imgs = {i['alt']: i['src']
                          for i in img_tags if re.match('\d{6} \d{2}.png', i['alt'])}
        for key, value in wyrmprint_imgs.items():
            urllib.request.urlretrieve(value, img_path("wyrmprints", key))

    except Exception as e:
        print(repr(e))


def download_dragon_img():
    try:
        url = "https://dragalialost.gamepedia.com/Dragon_List"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img', alt=True)

        dragon_imgs = {i['alt']: i['src']
                       for i in img_tags if re.match('\d{6} \d{2}.png', i['alt'])}
        for key, value in dragon_imgs.items():
            urllib.request.urlretrieve(value, img_path("dragons", key))

    except Exception as e:
        print(repr(e))


if __name__ == "__main__":
    update_adventurers_data()
    update_weapons_data()
    update_wyrmprints_data()
    update_dragons_data()
    # update_materials_data()
    # download_adventurer_img()
    # download_wyrmprint_img()
    # download_dragon_img()
