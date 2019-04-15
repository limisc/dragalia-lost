import main
const = 'weapon'
FILE = 'weapon'


def set_weapon():
    table = 'Weapons'
    fields = 'Id,BaseId,FormId,WeaponName,Type,Rarity,ElementalType,CraftNodeId,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,SkillName,Abilities11,Abilities21,IsPlayable'
    group = 'BaseId,FormId'
    parse_int = ['MinHp', 'MaxHp', 'MinAtk', 'MaxAtk']

    raw_data = main.get_data(table, fields, group)

    names = main.load_name(FILE)
    o_len = len(names)

    list = []
    dict = {}
    new = []
    for i in raw_data:
        item = i['title']
        rarity = int(item['Rarity'])
        if item['IsPlayable'] == '1' and rarity >= 3:
            uid = '{}_01_{}'.format(item['BaseId'], item['FormId'])
            name = main.set_name(names, item, new)

            new_item = {
                'id': uid,
                'name': name,
                'weapon': item['Type'],
                'element': item['ElementalType'],
                'rarity': item['Rarity'],
                'CraftNodeId': item['CraftNodeId'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            new_item['Skill'] = item['SkillName'] != ''

            special = {}
            for a in ['Abilities11', 'Abilities21']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a] = ability['Might']

                    if 'def' in ability:
                        # TODO Change special key for new version
                        special['DefEle'] = ability['defEle']
                        special['Def'] = ability['def']
                else:
                    new_item[a] = 0
            if len(special):
                new_item.update(special)

            dict[uid] = new_item
            list.append(new_item)
    main.save_file('dict', const, dict)
    main.save_file('list', const, list)

    if len(names) != o_len:
        main.save_file('locales', const, names)
        main.download_images(const, new)


if __name__ == '__main__':
    print(__file__)
    abilities = main.set_abilities()
    set_weapon()
