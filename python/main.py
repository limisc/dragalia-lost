import re
import requests
import pprint
import json
from pathlib import Path
import urllib.request
MAX = 500
BASE_URL = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit={}'.format(
    MAX)

ABBR_FIELDS = {
    'HP': 'HP',
    'strength': 'STR',
    'strength and HP': 'Hybrid',
    'defense': 'def'
}


def get_data(table, fields, group):
    def get_api_request(table, fields, group, offset):
        return '{}&tables={}&fields={}&group_by={}&offset={}'.format(BASE_URL, table, fields, group, offset)
    offset = 0
    data = []
    while offset % MAX == 0:
        url = get_api_request(table, fields, group, offset)
        r = requests.get(url).json()
        try:
            data += r['cargoquery']
            offset += len(data)
        except:
            print(r)
            raise Exception
    return data


def print_data(data):
    pp = pprint.PrettyPrinter(indent=2)
    pp.pprint(data)


def regex(details):
    result = {}
    result.update(regex_HP_STR_Def_DragonRes(details))
    result.update(regexRes(details))

    return result


def regex_HP_STR_Def_DragonRes(details=''):
    r = re.search(
        r'(Flame|Water|Wind|Light|Shadow)?:?\s*increases (strength|HP|defense|strength and HP) by \'*(\d+)%\'*' +
        r'(?:\,|\.| (?:and|when HP is) (?:adds \'\'\'(\d+)%\'\'\' to (Flame|Water|Wind|Light|Shadow) resistance|(?!below).)*$)', details, re.IGNORECASE
    )

    if r:
        element, field, v, res, resEle = r.groups()
        result = {}
        result['reqEle'] = element or ''
        result[ABBR_FIELDS[field]] = int(v)

        if resEle:
            result.update({'resEle': resEle.capitalize(), 'res': int(res)})

        return result

    return {}


def regexRes(details=''):
    # test = [
    #     "Reduces damage taken from High Midgardsormr by '''20%'''.",
    #     "Reduces shadow damage taken by '''3%'''.",
    # ]
    # details = test[1]

    r = re.search(
        r'Reduces (?:(Flame|Water|Wind|Light|Shadow) )?damage taken ' +
        r'(?:from (?:\[\[)?(High Midgardsormr|High Brunhilda|High Mercury|High Jupiter|High Zodiark).*)?' +
        r'by \'\'\'(\d+)%\'\'\'', details, re.IGNORECASE
    )

    if r:
        # print(r.groups())
        resEle, dungeon, v = r.groups()
        v = int(v)

        if resEle:
            resEle = resEle.capitalize()
            return {
                'resEle': resEle,
                'res': v,
            }
        elif dungeon:
            abbr = {
                "High Midgardsormr": "hms",
                "High Brunhilda": "hbh",
                "High Mercury": "hmc",
                "High Jupiter": "hjp",
                'High Zodiark': "hzd",
            }

            return {
                'dungeon': abbr[dungeon],
                'reduce': v,
            }

    return {}


def set_abilities():
    table = 'Abilities'
    fields = 'Id,Name,Details,PartyPowerWeight'
    group = 'Id'

    raw_data = get_data(table, fields, group)

    results = {}
    for i in raw_data:
        item = i['title']
        details = item['Details']
        might = int(item['PartyPowerWeight']
                    ) if item['PartyPowerWeight'] else 0
        new_item = {
            'Name': item['Name'],
            'Details': details,
            'Might': might
        }

        updates = regex(details)

        if len(updates):
            new_item.update(updates)

        results[item['Id']] = new_item

    return results


def load_name(file):
    path = Path(__file__).resolve().parent / 'locales/{}.json'.format(file)
    with open(path, encoding="utf8") as f:
        data = json.load(f)

    return data


def set_name(names, item, data_new=[], data_updates=[False]):
    uid = item.get('BaseId', item.get('Id', None))
    if uid == None:
        return

    if 'FormId' in item:
        uid += '_01_{}'.format(item['FormId'])

    en_name = item.get('Name', item.get('WeaponName', ''))
    ja_name = item.get('NameJP', item.get('WeaponNameJP', ''))

    if uid in names:
        if names[uid]['ja'] and names[uid]['zh']:
            return names[uid]
        else:
            names[uid] = {
                'en': en_name or names[uid]['en'],
                'ja': ja_name or names[uid]['ja'],
                'zh': names[uid]['zh'],
            }

            data_updates[0] = True

            return {
                'en': en_name,
                'ja': ja_name or names[uid]['ja'] or en_name,
                'zh': names[uid]['zh'] or en_name,
            }

    data_updates[0] = True
    data_new.append(uid)

    names[uid] = {
        'en': en_name,
        'ja': ja_name,
        'zh': '',
    }

    return {
        'en': en_name,
        'ja': ja_name or en_name,
        'zh': en_name,
    }


def save_file(f_type, file, data):
    if f_type == 'locales':
        path = Path(__file__).resolve().parent / 'locales/{}.json'.format(file)
    elif f_type == 'list':
        path = Path(__file__).resolve().parent.parent / \
            'src/data/dataList/{}.js'.format(file)
    elif f_type == 'dict':
        path = Path(__file__).resolve().parent.parent / \
            'src/data/content/{}.js'.format(file)
    elif f_type == 'facility':
        path = Path(__file__).resolve().parent.parent / \
            'src/locales/{}.js'.format(file)

    with open(path, 'w', encoding="utf-8") as f:
        if f_type != 'locales':
            f.write('const {} =\n '.format(file))
        json.dump(data, f, sort_keys=f_type == 'locales',
                  indent=2, ensure_ascii=False)

        if f_type != 'locales':
            f.write(';\n\nexport default {};\n'.format(file))
    f.close()
    print('save file: {}'.format(path))


def download_images(file_name, new_content=[]):
    pattern = {
        'adventurer': r'\d{6}_\d{2,3}_r0[345].png',
        'dragon': r'\d{6}_01.png',
        'weapon': r'\d{6}_01_\d{5}.png',
        'wyrmprint': r'\d{6}_0[12].png',
        'material': r'\d{9}.png',
        'facility': r'TW02_(\d{6})_IMG_0(\d)',
    }

    start = {
        'adventurer': '100001_01_r04.png',
        'dragon': '210001_01.png',
        'weapon': '301001_01_19901.png',
        'wyrmprint': '400001_01.png',
        'material': '104001011.png',
        'facility': 'TW02_100101_IMG_01.png'
    }

    end = {
        'adventurer': '2',
        'dragon': '3',
        'weapon': '4',
        'wyrmprint': 'A',
        'facility': 'U',
        'material': '4',
    }

    download = {}
    f_max = {}
    aifrom = start[file_name]
    keep = True
    while keep:
        url = 'https://dragalialost.gamepedia.com/api.php?action=query&format=json&list=allimages&aifrom={}&ailimit=max'.format(
            aifrom)

        response = requests.get(url).json()
        try:
            data = response['query']['allimages']

            for i in data:
                name = i['name']
                if name[0] == end[file_name]:
                    keep = False
                    break
                r = re.search(pattern[file_name], name)
                if r and any(ele in name for ele in new_content):
                    if file_name == 'facility':
                        f_key, f_level = r.groups()
                        if f_level > f_max.get(f_key, ''):
                            f_max[f_key] = f_level
                            download['{}.png'.format(f_key)] = i['url']
                    else:
                        download[name] = i['url']

            con = response.get('continue', None)
            if con and con.get('aicontinue', None):
                aifrom = con['aicontinue']
            else:
                keep = False
                break

        except:
            raise Exception

    for k, v in download.items():
        path = Path(__file__).resolve().parent.parent / \
            'public/images/{}/{}'.format(file_name, k)
        urllib.request.urlretrieve(v, path)
        print('download image: {}'.format(path))


def clear_dict(file):
    names = load_name(file)
    for k in list(names):
        if not names[k]['ja'] or not names[k]['zh']:
            del names[k]
    save_file('locales', file, names)


if __name__ == '__main__':
    print(__file__)
    # download_images('material', ['201002052'])
    download_images('facility', ['101005'])
