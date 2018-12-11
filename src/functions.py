import os
import re
import math
import json
import requests
from bs4 import BeautifulSoup
import urllib.request

API_EN = "https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables="
API_ZH = "https://dragalialost-zh.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables="

def get_cargoquery_url(region, cargo_table, param):
  return region + cargo_table + "&fields=" + param


def get_data(url):
  try:
    response = requests.get(url).json()
    if "error" in response.keys():
      raise ValueError
    else:
      return response
  except ValueError:
    print(response["error"])


def save_file(data, const_name, file_name):
  save_path = os.path.join(os.path.dirname(__file__), "redux", "store", "data", file_name)

  try:
    with open(save_path, "w") as f:
      f.write("const %s = \n" % const_name)
      f.write(json.dumps(data, indent=2))
      f.write(";\n")
      f.write("export default %s;" % const_name)
  except Exception as e:
      print(repr(e))


def update_adventurer_data():
  param = "Id,Name,NameZH,WeaponType,Rarity,ElementalType,VariationId," + \
    "MinHp3,MinHp4,MinHp5,MaxHp,PlusHp0,PlusHp1,PlusHp2,PlusHp3,PlusHp4,McFullBonusHp5," + \
    "MinAtk3,MinAtk4,MinAtk5,MaxAtk,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5"

  url = get_cargoquery_url(API_ZH, "Adventurers", param)
  raw_data = get_data(url)

  adventurers = []
  for i in raw_data["cargoquery"]:
    adventurer = i["title"]
    if adventurer["Id"] != "":
      adventurer["Id"] = "%s_0%s" % (adventurer["Id"], adventurer.pop("VariationId", None))
      if not any(a["Id"] == adventurer["Id"] for a in adventurers):
        kv = list(adventurer.items())
        adventurer.clear()

        for k,v in kv:
          if "Hp" in k:
            adventurer[k.replace("Hp", "HP")] = int(v)
          elif "Atk" in k:
            adventurer[k.replace("Atk", "STR")] = int(v)
          elif k == "Name":
            adventurer["Name"] = {}
            adventurer["Name"]["en"] = v
          elif k == "NameZH":
            if "zh-hans" in v:
              result = re.search( "(.*)-{zh-hans:(.*);.*}-(.*)", v)
              v = "".join(result.groups())
            adventurer["Name"]["zh"] = v
          elif k == "WeaponType":
            adventurer["weaponType"] = v
          elif k == "Rarity":
            adventurer["rarity"] = v
            adventurer["curRarity"] = v
          elif k == "ElementalType":
            adventurer["element"] = v
          else:
            adventurer[k] = v

      adventurer["image"] = "%s_r0%s.png" % (adventurer["Id"], adventurer["rarity"])
      adventurer['MAX_LEVEL'] = 80
      adventurers.append(adventurer)

  save_file(adventurers, "adventurer", "adventurer_data.js")


def update_weapon_data():
  MAX_LEVEL = {"3": 40, "4": 70, "5": 100}

  param = 'Id,BaseId,FormId,WeaponName,WeaponNameZH,Type,Rarity,ElementalType,' + \
    'CraftNodeId,ParentCraftNodeId,CraftGroupId,' + \
    'MinHp,MaxHp,MinAtk,MaxAtk,' + \
    'AssembleCoin,' + \
    'CraftMaterial1,CraftMaterialQuantity1,' + \
    'CraftMaterial2,CraftMaterialQuantity2,' + \
    'CraftMaterial3,CraftMaterialQuantity3,' + \
    'CraftMaterial4,CraftMaterialQuantity4,' + \
    'CraftMaterial5,CraftMaterialQuantity5'
  url = get_cargoquery_url(API_ZH, "Weapons", param)
  raw_data = get_data(url)

  weapons = []
  for i in raw_data["cargoquery"]:
    weapon = i["title"]

    if weapon["Id"] != "" and (not any(w["Id"] == weapon["Id"] for w in weapons)) and int(weapon["Rarity"]) >= 3:
      weapon["image"] = "%s_01_%s.png" % (weapon.pop("BaseId", None), weapon.pop("FormId", None))

      kv = list(weapon.items())
      weapon.clear()

      for k, v in kv:
        if "Hp" in k:
          weapon[k.replace("Hp", "HP")] = int(v)
        elif "Atk" in k:
          weapon[k.replace("Atk", "STR")] = int(v)
        elif k == "WeaponName":
          weapon["Name"] = {}
          weapon["Name"]["en"] = v
        elif k == "WeaponNameZH":
          if "zh-hans" in v:
            result = re.search( "(.*)-{zh-hans:(.*);.*}-(.*)", v)
            v = "".join(result.groups())
          weapon["Name"]["zh"] = v
        elif k == "ElementalType":
          weapon["element"] = v
        elif k == "Type":
          weapon["weaponType"] = v
        elif k == "Rarity":
          weapon["rarity"] = v
        else:
          try:
            weapon[k] = int(v)
          except:
            weapon[k] = v

      if weapon["element"] in ["Flame", "Water", "Wind", "Light", "Shadow"]:
        weapon["tier"] = "3"
      else:
        weapon["tier"] = str(weapon["CraftNodeId"])[0]

      weapon["Id"] = weapon["image"][:-4]
      weapon["MAX_LEVEL"] = MAX_LEVEL[weapon['rarity']]
      weapons.append(weapon)

  save_file(weapons, "weapon", "weapon_data.js")


def update_wyrmprint_data():
  MAX_LEVEL = {"2": 30, "3": 60, "4": 80, "5": 100}
  param = 'BaseId,Name,NameZH,Rarity,MinHp,MaxHp,MinAtk,MaxAtk'
  url = get_cargoquery_url(API_ZH, "Wyrmprints", param)
  raw_data = get_data(url)

  wyrmprints = []
  for i in raw_data["cargoquery"]:
    wyrmprint = i["title"]
    if wyrmprint["BaseId"] != "" and (not any(w["Id"] == wyrmprint["BaseId"] for w in wyrmprints)):
      kv = list(wyrmprint.items())
      wyrmprint.clear()

      for k,v in kv:
        if k == "BaseId":
          wyrmprint["Id"] = v
        elif "Hp" in k:
          wyrmprint[k.replace("Hp", "HP")] = int(v)
        elif "Atk" in k:
          wyrmprint[k.replace("Atk", "STR")] = int(v)
        elif k == "Name":
          wyrmprint["Name"] = {}
          wyrmprint["Name"]["en"] = v
        elif k == "NameZH":
          if "zh-hans" in v:
            result = re.search( "(.*)-{zh-hans:(.*);.*}-(.*)", v)
            v = "".join(result.groups())
          wyrmprint["Name"]["zh"] = v
        elif k == "Rarity":
          wyrmprint["rarity"] = v
        else:
          try:
            wyrmprint[k] = int(v)
          except:
            wyrmprint[k] = v

      wyrmprint["image"] = wyrmprint["Id"] + "_01.png"
      wyrmprint["MAX_LEVEL"] = MAX_LEVEL[wyrmprint['rarity']]
      wyrmprints.append(wyrmprint)
  save_file(wyrmprints, 'wyrmprint', 'wyrmprint_data.js')


def update_dragon_data():
  ability_param = "Id,Name"
  url = get_cargoquery_url(API_ZH, "Abilities", ability_param)
  raw_data = get_data(url)
  abilities = {}
  for i in raw_data["cargoquery"]:
    result = re.search("\((Flame|Water|Wind|Light|Shadow)\) (.*) \+(\d*)%", i["title"]["Name"])
    if (i["title"]["Id"] not in abilities.keys()) and result:
      ability = {}
      if "&" in result.group(2) or (result.group(2) in ["HP", "Strength"]):
        ability["element"] = result.group(1)

        if "&" in result.group(2):
          ability["field"] = "BOTH"
        elif result.group(2) == "HP":
          ability["field"] = "HP"
        elif result.group(2) == "Strength":
          ability["field"] = "STR"

        ability["value"] = int(result.group(3))
        abilities[i["title"]["Id"]] = ability

  dragons = []
  MAX_LEVEL = {"3": 60, "4": 80, "5": 100}

  param = "BaseId,Id,Name,NameZH,ElementalType,Rarity," + \
      "MinHp,MaxHp,MinAtk,MaxAtk,Abilities11,Abilities12"
  url = get_cargoquery_url(API_ZH, 'Dragons', param)
  raw_data = get_data(url)

  for i in raw_data["cargoquery"]:
    dragon = i["title"]
    if dragon["Id"] != "" and (not any(d["Id"] == dragon["Id"] for d in dragons)):
      dragon["image"] = dragon.pop("BaseId", None) + "_01.png"
      dragon["Abilities11"] = abilities[dragon["Abilities11"]]
      dragon["Abilities12"] = abilities[dragon["Abilities12"]]
      kv = list(dragon.items())
      dragon.clear()

      for k, v in kv:
        if "Hp" in k:
          dragon[k.replace("Hp", "HP")] = int(v)
        elif "Atk" in k:
          dragon[k.replace("Atk", "STR")] = int(v)
        elif k == "Name":
          dragon["Name"] = {}
          dragon["Name"]["en"] = v
        elif k == "NameZH":
          if "zh-hans" in v:
            result = re.search( "(.*)-{zh-hans:(.*);.*}-(.*)", v)
            v = "".join(result.groups())
          dragon["Name"]["zh"] = v
        elif k == "Rarity":
          dragon["rarity"] = v
        elif k == "ElementalType":
          dragon["element"] = v
        else:
          try:
            dragon[k] = int(v)
          except:
            dragon[k] = v
      dragon["MAX_LEVEL"] = MAX_LEVEL[dragon["rarity"]]
      dragons.append(dragon)
  save_file(dragons, "dragon", "dragon_data.js")


if __name__ == "__main__":
  update_weapon_data()