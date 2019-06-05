import main
FILE_NAME = 'dragon'


def set_dragon():
    table = 'Dragons'
    fields = 'BaseId,Name,NameJP,Rarity,ElementalType,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,' + \
        'Abilities11,Abilities12,Abilities21,Abilities22,' + \
        'IsPlayable'
    group = 'BaseId'

    parse_int = ['MinHp', 'MaxHp', 'MinAtk', 'MaxAtk']

    raw_data = main.get_data(table, fields, group)

    names = main.load_name(FILE_NAME)

    data_new = []
    data_list = []
    data_dict = {}
    data_updates = [False]

    for i in raw_data:
        item = i['title']
        if item['BaseId'] and item['IsPlayable'] == '1':
            uid = '{}_01'.format(item['BaseId'])
            name = main.set_name(names, item, data_new, data_updates)

            new_item = {
                'id': uid,
                'name': name,
                'element': item['ElementalType'],
                'rarity': item['Rarity'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            HP_V = {'incHP1': 0, 'incHP2': 0}
            STR_V = {'incSTR1': 0, 'incSTR2': 0}
            res_V = {}

            for a in ['Abilities11', 'Abilities12', 'Abilities21', 'Abilities22']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a.lower()] = ability['Might']
                    level = a[-1]
                    if 'HP' in ability:
                        HP_V['incHP' + level] = ability['HP']
                    elif 'STR' in ability:
                        STR_V['incSTR'+level] = ability['STR']
                    elif 'Hybrid' in ability:
                        HP_V['incHP' + level] = ability['Hybrid']
                        STR_V['incSTR'+level] = ability['Hybrid']

                    if 'res' in ability:
                        res_V['resEle'] = ability['resEle']
                        res_V['incRes'] = ability['res']
                else:
                    new_item[a.lower()] = 0

            new_item.update(HP_V)
            new_item.update(STR_V)
            new_item.update(res_V)

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
    abilities = main.set_abilities()
    set_dragon()
