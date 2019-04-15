import main

FILE = 'wyrmprint'


def set_wyrmprint():
    table = 'Wyrmprints'
    fields = 'BaseId,Name,NameJP,Rarity,IsPlayable,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,' + \
        'Abilities11,Abilities12,Abilities21,Abilities22,Abilities31,Abilities32'
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
        rarity = int(item['Rarity'])
        if item['BaseId'] and item['IsPlayable'] == '1' and rarity >= 3:
            uid = '{}_0'.format(item['BaseId'])
            name = main.set_name(names, item, new_content)

            new_item = {
                'id': uid,
                'name': name,
                'rarity': item['Rarity'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            addition1 = {}
            for a in ['Abilities11', 'Abilities12', 'Abilities21', 'Abilities22', 'Abilities31', 'Abilities32']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a] = ability['Might']

                    level = a[-1]
                    if 'def' in ability:
                        # TODO
                        addition1['Def' + level] = ability['def']

                    if 'res' in ability:
                        addition1['ResEle'] = ability['resEle']
                        addition1['Res' + level] = ability['res']

                    if 'reduce' in ability:
                        # TODO
                        addition1['conquer'] = ability['counter']
                        addition1['reduceDamage' + level] = ability['reduce']
                else:
                    new_item[a] = 0

            if len(addition1):
                new_item.update(addition1)

            data_list.append(new_item)
            data_dict[uid] = new_item
    main.save_file('list', FILE, data_list)
    main.save_file('dict', FILE, data_dict)

    if len(names) != o_len:
        main.save_file('locales', FILE, names)
        main.download_images(FILE, new_content)


if __name__ == '__main__':
    abilities = main.set_abilities()
    set_wyrmprint()
