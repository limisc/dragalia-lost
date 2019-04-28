import main

<<<<<<< HEAD
FILE = 'wyrmprint'
=======
FILE_NAME = 'wyrmprint'
>>>>>>> dragalia-lost-next/master


def set_wyrmprint():
    table = 'Wyrmprints'
    fields = 'BaseId,Name,NameJP,Rarity,IsPlayable,' + \
        'MinHp,MaxHp,MinAtk,MaxAtk,' + \
<<<<<<< HEAD
        'Abilities11,Abilities12,Abilities21,Abilities22,Abilities31,Abilities32'
=======
        'Abilities11,Abilities12,Abilities13,Abilities21,Abilities22,Abilities23,Abilities31,Abilities32,Abilities33'
>>>>>>> dragalia-lost-next/master
    group = 'BaseId'

    parse_int = ['MinHp', 'MaxHp', 'MinAtk', 'MaxAtk']

    raw_data = main.get_data(table, fields, group)

<<<<<<< HEAD
    names = main.load_name(FILE)
    o_len = len(names)

    new_content = []
=======
    names = main.load_name(FILE_NAME)
    o_len = len(names)

    data_new = []
>>>>>>> dragalia-lost-next/master
    data_list = []
    data_dict = {}

    for i in raw_data:
        item = i['title']
        rarity = int(item['Rarity'])
        if item['BaseId'] and item['IsPlayable'] == '1' and rarity >= 3:
<<<<<<< HEAD
            uid = '{}_0'.format(item['BaseId'])
            name = main.set_name(names, item, new_content)
=======
            uid = '{}'.format(item['BaseId'])
            name = main.set_name(names, item, data_new)
>>>>>>> dragalia-lost-next/master

            new_item = {
                'id': uid,
                'name': name,
                'rarity': item['Rarity'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            addition1 = {}
<<<<<<< HEAD
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
=======
            for a in ['Abilities11', 'Abilities12', 'Abilities13',
                      'Abilities21', 'Abilities22', 'Abilities23',
                      'Abilities31', 'Abilities32', 'Abilities33']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a.lower()] = ability['Might']

                    level = a[-1]

                    if 'STR' in ability:
                        addition1['incSTR' + level] = ability['STR']

                    if 'def' in ability:
                        addition1['incDef' + level] = ability['def']

                    if 'res' in ability:
                        addition1['resEle'] = ability['resEle']
                        addition1['incRes' + level] = ability['res']

                    if 'dungeon' in ability:
                        addition1['dungeon'] = ability['dungeon']
                        addition1['counter' + level] = ability['counter']
                else:
                    new_item[a.lower()] = 0
>>>>>>> dragalia-lost-next/master

            if len(addition1):
                new_item.update(addition1)

            data_list.append(new_item)
            data_dict[uid] = new_item
<<<<<<< HEAD
    main.save_file('list', FILE, data_list)
    main.save_file('dict', FILE, data_dict)

    if len(names) != o_len:
        main.save_file('locales', FILE, names)
        main.download_images(FILE, new_content)
=======

    main.save_file('list', FILE_NAME, data_list)
    main.save_file('dict', FILE_NAME, data_dict)

    if len(names) != o_len:
        print(data_new)
        main.save_file('locales', FILE_NAME, names)
        main.download_images(FILE_NAME, data_new)
>>>>>>> dragalia-lost-next/master


if __name__ == '__main__':
    abilities = main.set_abilities()
    set_wyrmprint()
