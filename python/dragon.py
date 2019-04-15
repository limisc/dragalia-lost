import main
FILE = 'dragon'


def set_dragon():
    table = 'Dragons'
    fields = 'BaseId,Name,NameJP,Rarity,ElementalType,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,' + \
        'Abilities11,Abilities12,Abilities21,Abilities22,' + \
        'IsPlayable'
    group = 'BaseId'

    parse_int = ['MinHp', 'MaxHp', 'MinAtk', 'MaxAtk']

    raw_data = main.get_data(table, fields, group)

    names = main.load_name(FILE)
    o_len = len(names)

    new_content = []
    data_list = []
    data_dict = {}

    for i in raw_data:
        item = i['title']
        if item['BaseId'] and item['IsPlayable'] == '1':
            uid = '{}_01'.format(item['BaseId'])
            name = main.set_name(names, item, new_content)

            new_item = {
                'id': uid,
                'name': name,
                'element': item['ElementalType'],
                'rarity': item['Rarity'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            addition1 = {
                'ability1': {
                    'HP': 0,
                    'STR': 0,
                },
                'ability2': {
                    'HP': 0,
                    'STR': 0,
                }
            }
            addition2 = {}
            for a in ['Abilities11', 'Abilities12', 'Abilities21', 'Abilities22']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a] = ability['Might']

                    level = a[-1]
                    if 'ability' in ability:
                        addition1['ability' + level] = ability['ability']

                    if 'res' in ability:
                        # TODO
                        addition2['ResEle'] = ability['resEle']
                        addition2['Res' + level] = ability['res']
                else:
                    new_item[a] = 0

            new_item.update(addition1)
            if len(addition2):
                new_item.update(addition2)

            data_list.append(new_item)
            data_dict[uid] = new_item

    main.save_file('list', FILE, data_list)
    main.save_file('dict', FILE, data_dict)

    if len(names) != o_len:
        main.save_file('locales', FILE, names)
        main.download_images(FILE, new_content)


if __name__ == '__main__':
    abilities = main.set_abilities()
    set_dragon()
