import main

FILE_NAME = 'weapon'


def set_weapon():
    table = 'Weapons'
    fields = 'Id,BaseId,FormId,WeaponName,WeaponNameJP,Type,Rarity,ElementalType,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,SkillName,Abilities11,Abilities21,IsPlayable'
    group = 'BaseId,FormId'
    parse_int = ['MinHp', 'MaxHp', 'MinAtk', 'MaxAtk']

    raw_data = main.get_data(table, fields, group)

    names = main.load_name(FILE_NAME)

    data_list = []
    data_dict = {}
    data_new = []
    data_updates = [False]

    for i in raw_data:
        item = i['title']
        rarity = int(item['Rarity'])
        if item['IsPlayable'] == '1' and rarity >= 3:
            uid = '{}_01_{}'.format(item['BaseId'], item['FormId'])
            name = main.set_name(names, item, data_new, data_updates)

            new_item = {
                'id': uid,
                'name': name,
                'weapon': item['Type'],
                'element': item['ElementalType'],
                'rarity': item['Rarity'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            new_item['skill'] = item['SkillName'] != ''

            special = {}
            for a in ['Abilities11', 'Abilities21']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a.lower()] = ability['Might']

                    if 'STR' in ability:
                        special['reqEle'] = ability['reqEle']
                        special['incSTR'] = ability['STR']
                    elif 'def' in ability:
                        special['reqEle'] = ability['reqEle']
                        special['incDef'] = ability['def']
                else:
                    new_item[a.lower()] = 0
            if len(special):
                new_item.update(special)

            data_list.append(new_item)
            data_dict[uid] = new_item
    main.save_file('list', FILE_NAME, data_list)
    main.save_file('dict', FILE_NAME, data_dict)

    if data_updates[0]:
        main.save_file('locales', FILE_NAME, names)

    if data_new:
        print(data_new)
        main.download_images(FILE_NAME, data_new)


if __name__ == '__main__':
    print(__file__)
    abilities = main.set_abilities()
    set_weapon()
