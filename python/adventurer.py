import main
const = 'adventurer'

match_lv = {
    '5': {
        'Abilities11': 10,
        'Abilities12': 30,
        'Abilities21': 10,
        'Abilities22': 40,
        'Abilities31': 20,
        'Abilities32': 45,
    },
    'res': {
        'Abilities11': 10,
        'Abilities12': 30,
        'Abilities21': 10,
        'Abilities22': 40,
        'Abilities31': 45,
    }
}


def set_adventurer():
    table = 'Adventurers'
    fields = 'Id,VariationId,Name,NameJP,WeaponType,Rarity,ElementalType,' + \
        'MinHp3,MinHp4,MinHp5,MaxHp,PlusHp0,PlusHp1,PlusHp2,PlusHp3,PlusHp4,McFullBonusHp5,' + \
        'MinAtk3,MinAtk4,MinAtk5,MaxAtk,PlusAtk0,PlusAtk1,PlusAtk2,PlusAtk3,PlusAtk4,McFullBonusAtk5,' + \
        'Abilities11,Abilities12,Abilities21,Abilities22,Abilities31,Abilities32,' + \
        'ExAbilityData1,ExAbilityData2,ExAbilityData3,ExAbilityData4,ExAbilityData5,' + \
        'DefCoef,IsPlayable'
    group = 'Id,VariationId'
    parse_int = [
        'MinHp3', 'MinHp4', 'MinHp5', 'MaxHp', 'PlusHp0', 'PlusHp1', 'PlusHp2', 'PlusHp3', 'PlusHp4', 'McFullBonusHp5',
        'MinAtk3', 'MinAtk4', 'MinAtk5', 'MaxAtk', 'PlusAtk0', 'PlusAtk1', 'PlusAtk2', 'PlusAtk3', 'PlusAtk4', 'McFullBonusAtk5',
        'DefCoef'
    ]

    raw_data = main.get_data(table, fields, group)

    names = main.load_name(const)
    o_len = len(names)
    list = []
    dict = {}
    new = []
    for i in raw_data:
        item = i['title']
        if item['IsPlayable'] == '1':
            uid = '{}_0{}_r0'.format(item['Id'], item['VariationId'])
            name = main.set_name(names, item, new)

            new_item = {
                'id': uid,
                'name': name,
                'weapon': item['WeaponType'],
                'element': item['ElementalType'],
                'rarity': item['Rarity'],
            }

            for k in parse_int:
                new_item[k] = int(item[k])

            addition1 = {}
            addition2 = {}
            coAddition = {}
            for a in ['Abilities11', 'Abilities12', 'Abilities21', 'Abilities22', 'Abilities31', 'Abilities32']:
                ability = abilities.get(item[a], '')
                if ability:
                    new_item[a] = ability['Might']

                    level = a[-1]

                    if 'def' in ability:
                        # TODO Change key name
                        addition1['DefLV' + level] = match_lv.get(
                            item['Rarity'], match_lv['res'])[a]
                        addition2['Def' + level] = ability['def']

            for c in ['ExAbilityData1', 'ExAbilityData2', 'ExAbilityData3', 'ExAbilityData4', 'ExAbilityData5']:
                coAbility = coAbilities.get(item[c], '')
                level = str(int(c[-1]) - 1)
                if coAbility:
                    new_item['EX' + level] = coAbility['Might']

                    if 'HP' in coAbility:
                        coAddition['EXHP' + level] = coAbility['HP']

                    if 'def' in coAbility:
                        coAddition['EXDef' + level] = coAbility['def']

            new_item.update(coAddition)
            new_item.update(addition1)
            new_item.update(addition2)

            list.append(new_item)
            dict[uid] = new_item

    main.save_file('dict', const, dict)
    main.save_file('list', const, list)

    if len(names) != o_len:
        print(new)
        main.save_file('locales', const, names)
        main.download_images(const, new)


if __name__ == '__main__':
    print(__file__)
    abilities = main.set_abilities()
    coAbilities = main.set_coAbilities()
    set_adventurer()
