import os
import re
import math
import json
import requests
from bs4 import BeautifulSoup
import urllib.request

API_EN   = "https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables="
API_ZH   = "https://dragalialost-zh.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables="

def img_path(file_folder, file_name):
  return os.path.join(os.path.dirname(__file__), "..", "public", "img", file_folder, file_name)

def save_file(data, const_name, file_name):
  save_path = os.path.join(os.path.dirname(__file__), 'components', 'data', file_name)
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
          'MinAtk3,MinAtk4,MinAtk5,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5'
  url = API_ZH + "Adventurers" + "&fields=" + param

  raw_data = requests.get(url=url).json()['cargoquery']
  for i in raw_data:
    adventurer = i['title']
    adventurer['img'] = adventurer['Id'] + " 0" + adventurer['VariationId'] + " r0" + adventurer['Rarity'] + ".png"
    for k, v in adventurer.items():
      try:
        adventurer[k] = int(v)
      except ValueError:
        adventurer[k] = v
      except Exception:
        print(k, v)
    adventurer['type'] = adventurer.pop('WeaponType', None)
    adventurer['rarity'] = str(adventurer.pop('Rarity', None))
    adventurer['element'] = adventurer.pop('ElementalType', None)
    adventurers.append(adventurer)

  save_file(adventurers, 'adventurers', 'adventurer_data.js')

def update_weapons_data():
  weapons = []
  param = 'Id,BaseId,FormId,WeaponName,Type,Rarity,ElementalType,' + \
          'CraftNodeId,ParentCraftNodeId,CraftGroupId,' + \
          'AssembleCoin,' + \
          'CraftMaterial1,CraftMaterialQuantity1,' + \
          'CraftMaterial2,CraftMaterialQuantity2,' + \
          'CraftMaterial3,CraftMaterialQuantity3,' + \
          'CraftMaterial4,CraftMaterialQuantity4,' + \
          'CraftMaterial5,CraftMaterialQuantity5'
  url = API_ZH + "Weapons" + "&fields=" + param

  raw_data = requests.get(url=url).json()['cargoquery']
  for i in raw_data:
    if not (any(w['Id'] == i['title']['Id'] for w in weapons)) and int(i['title']['Rarity']) >= 3:
      weapon = i['title']
      weapon['img'] = weapon.pop('BaseId', None) + "_01_" + weapon.pop('FormId', None) + ".png"
      for k, v in weapon.items():
        try:
          weapon[k] = int(v)
        except ValueError:
          pass
      weapon['Id'] = str(weapon['Id'])
      weapon['Name'] = weapon.pop('WeaponName', None)
      weapon['type'] = weapon.pop('Type', None)
      weapon['element'] = weapon.pop('ElementalType', None)
      weapon['rarity'] = str(weapon.pop('Rarity', None))
      weapon['tier'] = str(math.floor(weapon['CraftNodeId'] / 100)) if weapon['CraftNodeId'] else "0"
      weapons.append(weapon)

  save_file(weapons, 'weapons', 'weapon_data.js')

def update_dragons_data():
  ability_param = 'Id,Name'
  url = get_cargoquery_url(API_ZH, "Abilities", ability_param)
  try:
    raw_data = requests.get(url=url).json()
  except Exception as e:
    print(repr(e))
  abilities = {}
  for i in raw_data['cargoquery']:
    result = re.search('\((Flame|Water|Wind|Light|Shadow)\) (.*) \+(\d*)%',i['title']['Name'])
    if (i['title']['Id'] not in abilities.keys()) and result:
      ability = {}
      ability['attr'] = "both" if "&" in result.group(2) else result.group(2)
      ability['value'] = int(result.group(3))
      abilities[i['title']['Id']] = ability

  dragons = []
  param = 'BaseId,Id,Name,ElementalType,' + \
          'Rarity,VariationId,' + \
          'MinHp,MaxHp,MinAtk,MaxAtk,' + \
          'Abilities11,Abilities12'
  url = get_cargoquery_url(API_ZH, 'Dragons', param)
  try:
    raw_data = requests.get(url=url).json()
  except Exception as e:
    print(repr(e))

  for i in raw_data['cargoquery']:
    if not any(d['Id'] == i['title']['Id'] for d in dragons):
      dragon = i['title']
      dragon['img'] = dragon['BaseId'] + " 01.png"
      dragon['Abilities11'] = abilities[dragon['Abilities11']]
      dragon['Abilities12'] = abilities[dragon['Abilities12']]
      for k, v in dragon.items():
        try:
          dragon[k] = int(v)
        except Exception:
          pass
      dragon['Id'] = str(dragon['Id'])
      dragon['rarity'] = str(dragon.pop('Rarity', None))
      dragon['element'] = dragon.pop('ElementalType', None)
      dragons.append(dragon)
  save_file(dragons, 'dragons', 'dragon_data.js')

def update_wyrmprints_data():
  wyrmprints = []
  param = 'BaseId,Name,Rarity,' + \
          'MinHp,MaxHp,MinAtk,MaxAtk'
  url = get_cargoquery_url(API_ZH, 'Wyrmprints', param)
  try:
    raw_data = requests.get(url=url).json()
  except Exception as e:
    print(repr(e))

  for i in raw_data['cargoquery']:
    wyrmprint = i['title']
    wyrmprint['img'] = wyrmprint['BaseId'] + " 01.png"
    for k, v in wyrmprint.items():
      try:
        wyrmprint[k] = int(v)
      except Exception:
        pass

    wyrmprint['rarity'] = str(wyrmprint.pop('Rarity', None))
    wyrmprints.append(wyrmprint)
  save_file(wyrmprints, 'wyrmprints', 'wyrmprint_data.js')


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


    adventurer_imgs = {i['alt']: i['src'] for i in img_tags if re.match('\d{6} \d{2} r\d{2}.png', i['alt'])}
    for key, value in adventurer_imgs.items():
      urllib.request.urlretrieve(value, img_path("adventurers", key))

  except Exception as e:
    print(repr(e))

def download_wyrmprint_img():
  try:
    url = "https://dragalialost.gamepedia.com/Wyrmprint_List"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    img_tags = soup.find_all('img', alt=True)


    wyrmprint_imgs = {i['alt']: i['src'] for i in img_tags if re.match('\d{6} \d{2}.png', i['alt'])}
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


    dragon_imgs = {i['alt']: i['src'] for i in img_tags if re.match('\d{6} \d{2}.png', i['alt'])}
    for key, value in dragon_imgs.items():
      urllib.request.urlretrieve(value, img_path("dragons", key))

  except Exception as e:
    print(repr(e))


if __name__ == "__main__":
  # update_adventurers_data()
  update_weapons_data()
  # update_materials_data()
  # update_wyrmprints_data()
  # update_dragons_data()
  # download_adventurer_img()
  # download_wyrmprint_img()
  # download_dragon_img()