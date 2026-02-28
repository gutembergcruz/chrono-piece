import json
import os
import re

volume_links = {
    1: "https://amzn.to/4rFV58a", 2: "https://amzn.to/4baPaSs", 3: "https://amzn.to/478ByEU",
    4: "https://amzn.to/4kYJvlY", 5: "https://amzn.to/4rCIXot", 6: "https://amzn.to/4tTi2pI",
    7: "https://amzn.to/4kSgKXU", 8: "https://amzn.to/4ckIp1L", 9: "https://amzn.to/4aP4NOe",
    10: "https://amzn.to/4lf9mq5", 11: "https://amzn.to/4cPkdo9", 12: "https://amzn.to/3ZX1yzf",
    13: "https://amzn.to/3ZZWhqH", 14: "https://amzn.to/4c92oQO", 15: "https://amzn.to/4aP8Slt",
    16: "https://amzn.to/3P0Yboy", 17: "https://amzn.to/40AMFml", 18: "https://amzn.to/4s5WC73",
    19: "https://amzn.to/3ZZ1ajP", 20: "https://amzn.to/4rwPnoZ", 21: "https://amzn.to/4rFWdZs",
    22: "https://amzn.to/4aBuW4b", 23: "https://amzn.to/4tVEtKV", 24: "https://amzn.to/4u0DwBi",
    25: "https://amzn.to/3OsBOZd", 26: "https://amzn.to/3OsDcen", 27: "https://amzn.to/4kRZEJQ",
    28: "https://amzn.to/4aW8hyt", 29: "https://amzn.to/4aSZdu8", 30: "https://amzn.to/4r18feO",
    31: "https://amzn.to/40tNnSm", 32: "https://amzn.to/4sbjwKq", 33: "https://amzn.to/4tWOJCN",
    34: "https://amzn.to/4u0E61W", 35: "https://amzn.to/3ZX2nYR", 36: "https://amzn.to/4qVQhu4",
    37: "https://amzn.to/4kVkFDi", 38: "https://amzn.to/3ZTB8hZ", 39: "https://amzn.to/4rBIN0p",
    40: "https://amzn.to/46pi8eN", 41: "https://amzn.to/4sfnnWY", 42: "https://amzn.to/4sa4wwg",
    43: "https://amzn.to/3OyktxX", 44: "https://amzn.to/4cayzzi", 45: "https://amzn.to/4cOfzXB",
    46: "https://amzn.to/4r197A6", 47: "https://amzn.to/4r2qVLd", 48: "https://amzn.to/3OLOudz",
    49: "https://amzn.to/3OzwqmZ", 50: "https://amzn.to/4rweacI", 51: "https://amzn.to/4rweacI",
    52: "https://amzn.to/4aQawmL", 53: "https://amzn.to/4aQPpAK", 54: "https://amzn.to/4cNy0vu",
    55: "https://amzn.to/4ce0wX5", 56: "https://amzn.to/4aSOjVu", 57: "https://amzn.to/4ce0GOb",
    58: "https://amzn.to/4aSOnEI", 59: "https://amzn.to/40uaegD", 60: "https://amzn.to/47d47B8",
    61: "https://amzn.to/4s9k6Iz", 62: "https://amzn.to/3MAnD3H", 63: "https://amzn.to/3MJisOW",
    64: "https://amzn.to/3OA6ojG", 65: "https://amzn.to/4rFZurI", 66: "https://amzn.to/4tRob65",
    67: "https://amzn.to/4l15SHs", 68: "https://amzn.to/4aSQ3y0", 69: "https://amzn.to/4sdmy0J",
    70: "https://amzn.to/4rFZLLg", 71: "https://amzn.to/3N5y7YV", 72: "https://amzn.to/4rMpNMP",
    73: "https://amzn.to/4rDWY5e", 74: "https://amzn.to/3Oyn6zP", 75: "https://amzn.to/4u1wAE6",
    76: "https://amzn.to/46MRPzx", 77: "https://amzn.to/4kZpjAr", 78: "https://amzn.to/40wNRao",
    79: "https://amzn.to/4kUVwJd", 80: "https://amzn.to/4tUsjBZ", 81: "https://amzn.to/4sgWyBL",
    82: "https://amzn.to/4aSY8Tl", 83: "https://amzn.to/46rYTkQ", 84: "https://amzn.to/4tUsptl",
    85: "https://amzn.to/3ZWBTH4", 86: "https://amzn.to/3OxAzYI", 87: "https://amzn.to/3ZTEscX",
    88: "https://amzn.to/4aDuylT", 89: "https://amzn.to/4aZUNlw", 90: "https://amzn.to/4r2tZXJ",
    91: "https://amzn.to/46sWJRV", 92: "https://amzn.to/3ODzFK8", 93: "https://amzn.to/4qY4p63",
    94: "https://amzn.to/4qSwyeH", 95: "https://amzn.to/4seP4zd", 96: "https://amzn.to/46m67H6",
    97: "https://amzn.to/4r34Pbn", 98: "https://amzn.to/4aP9UxU", 99: "https://amzn.to/3MuIVQf",
    100: "https://amzn.to/40025R1", 101: "https://amzn.to/4sbfAcE", 102: "https://amzn.to/3ZWCW9Y",
    103: "https://amzn.to/4sgoaXM", 104: "https://amzn.to/4ue63DF", 105: "https://amzn.to/4tWVVyS",
    106: "https://amzn.to/46orDem", 107: "https://amzn.to/4aC9hsL", 108: "https://amzn.to/4aDvV41",
    109: "https://amzn.to/4kVlD2B", 110: "https://amzn.to/4c98gcO", 111: "https://amzn.to/4tYqqEy",
    112: "https://amzn.to/4sbRFKb"
}

chapter_to_volume = {}
for ch in range(1, 9): chapter_to_volume[ch] = 1
for ch in range(9, 18): chapter_to_volume[ch] = 2
for ch in range(18, 27): chapter_to_volume[ch] = 3
for ch in range(27, 37): chapter_to_volume[ch] = 4
for ch in range(37, 47): chapter_to_volume[ch] = 5
for ch in range(47, 57): chapter_to_volume[ch] = 6
for ch in range(57, 67): chapter_to_volume[ch] = 7
for ch in range(67, 77): chapter_to_volume[ch] = 8
for ch in range(77, 86): chapter_to_volume[ch] = 9
for ch in range(86, 96): chapter_to_volume[ch] = 10
for ch in range(96, 106): chapter_to_volume[ch] = 11
for ch in range(106, 116): chapter_to_volume[ch] = 12
for ch in range(116, 126): chapter_to_volume[ch] = 13
for ch in range(126, 136): chapter_to_volume[ch] = 14
for ch in range(136, 146): chapter_to_volume[ch] = 15
for ch in range(146, 156): chapter_to_volume[ch] = 16
for ch in range(156, 166): chapter_to_volume[ch] = 17
for ch in range(166, 176): chapter_to_volume[ch] = 18
for ch in range(176, 186): chapter_to_volume[ch] = 19
for ch in range(186, 196): chapter_to_volume[ch] = 20
for ch in range(196, 206): chapter_to_volume[ch] = 21
for ch in range(206, 216): chapter_to_volume[ch] = 22
for ch in range(216, 226): chapter_to_volume[ch] = 23
for ch in range(226, 236): chapter_to_volume[ch] = 24
for ch in range(236, 246): chapter_to_volume[ch] = 25
for ch in range(246, 256): chapter_to_volume[ch] = 26
for ch in range(256, 266): chapter_to_volume[ch] = 27
for ch in range(266, 276): chapter_to_volume[ch] = 28
for ch in range(276, 286): chapter_to_volume[ch] = 29
for ch in range(286, 296): chapter_to_volume[ch] = 30
for ch in range(296, 306): chapter_to_volume[ch] = 31
for ch in range(306, 316): chapter_to_volume[ch] = 32
for ch in range(316, 326): chapter_to_volume[ch] = 33
for ch in range(326, 336): chapter_to_volume[ch] = 34
for ch in range(336, 346): chapter_to_volume[ch] = 35
for ch in range(346, 356): chapter_to_volume[ch] = 36
for ch in range(356, 366): chapter_to_volume[ch] = 37
for ch in range(366, 376): chapter_to_volume[ch] = 38
for ch in range(376, 386): chapter_to_volume[ch] = 39
for ch in range(386, 396): chapter_to_volume[ch] = 40
for ch in range(396, 406): chapter_to_volume[ch] = 41
for ch in range(406, 416): chapter_to_volume[ch] = 42
for ch in range(416, 426): chapter_to_volume[ch] = 43
for ch in range(426, 436): chapter_to_volume[ch] = 44
for ch in range(436, 446): chapter_to_volume[ch] = 45
for ch in range(446, 456): chapter_to_volume[ch] = 46
for ch in range(456, 466): chapter_to_volume[ch] = 47
for ch in range(466, 476): chapter_to_volume[ch] = 48
for ch in range(476, 486): chapter_to_volume[ch] = 49
for ch in range(486, 496): chapter_to_volume[ch] = 50
for ch in range(496, 506): chapter_to_volume[ch] = 51
for ch in range(506, 516): chapter_to_volume[ch] = 52
for ch in range(516, 526): chapter_to_volume[ch] = 53
for ch in range(526, 536): chapter_to_volume[ch] = 54
for ch in range(536, 546): chapter_to_volume[ch] = 55
for ch in range(546, 556): chapter_to_volume[ch] = 56
for ch in range(556, 566): chapter_to_volume[ch] = 57
for ch in range(566, 576): chapter_to_volume[ch] = 58
for ch in range(576, 586): chapter_to_volume[ch] = 59
for ch in range(586, 596): chapter_to_volume[ch] = 60
for ch in range(596, 606): chapter_to_volume[ch] = 61
for ch in range(606, 616): chapter_to_volume[ch] = 62
for ch in range(616, 626): chapter_to_volume[ch] = 63
for ch in range(626, 636): chapter_to_volume[ch] = 64
for ch in range(636, 646): chapter_to_volume[ch] = 65
for ch in range(646, 656): chapter_to_volume[ch] = 66
for ch in range(656, 666): chapter_to_volume[ch] = 67
for ch in range(666, 676): chapter_to_volume[ch] = 68
for ch in range(676, 686): chapter_to_volume[ch] = 69
for ch in range(686, 696): chapter_to_volume[ch] = 70
for ch in range(696, 706): chapter_to_volume[ch] = 71
for ch in range(706, 716): chapter_to_volume[ch] = 72
for ch in range(716, 726): chapter_to_volume[ch] = 73
for ch in range(726, 736): chapter_to_volume[ch] = 74
for ch in range(736, 746): chapter_to_volume[ch] = 75
for ch in range(746, 756): chapter_to_volume[ch] = 76
for ch in range(756, 766): chapter_to_volume[ch] = 77
for ch in range(766, 776): chapter_to_volume[ch] = 78
for ch in range(776, 786): chapter_to_volume[ch] = 79
for ch in range(786, 796): chapter_to_volume[ch] = 80
for ch in range(796, 806): chapter_to_volume[ch] = 81
for ch in range(806, 816): chapter_to_volume[ch] = 82
for ch in range(816, 826): chapter_to_volume[ch] = 83
for ch in range(826, 836): chapter_to_volume[ch] = 84
for ch in range(836, 846): chapter_to_volume[ch] = 85
for ch in range(846, 856): chapter_to_volume[ch] = 86
for ch in range(856, 866): chapter_to_volume[ch] = 87
for ch in range(866, 876): chapter_to_volume[ch] = 88
for ch in range(876, 886): chapter_to_volume[ch] = 89
for ch in range(886, 896): chapter_to_volume[ch] = 90
for ch in range(896, 906): chapter_to_volume[ch] = 91
for ch in range(906, 916): chapter_to_volume[ch] = 92
for ch in range(916, 926): chapter_to_volume[ch] = 93
for ch in range(926, 936): chapter_to_volume[ch] = 94
for ch in range(936, 946): chapter_to_volume[ch] = 95
for ch in range(946, 956): chapter_to_volume[ch] = 96
for ch in range(956, 966): chapter_to_volume[ch] = 97
for ch in range(966, 976): chapter_to_volume[ch] = 98
for ch in range(976, 986): chapter_to_volume[ch] = 99
for ch in range(986, 996): chapter_to_volume[ch] = 100
for ch in range(996, 1006): chapter_to_volume[ch] = 101
for ch in range(1006, 1016): chapter_to_volume[ch] = 102
for ch in range(1016, 1026): chapter_to_volume[ch] = 103
for ch in range(1026, 1056): chapter_to_volume[ch] = 104
for ch in range(1056, 1066): chapter_to_volume[ch] = 105
for ch in range(1066, 1076): chapter_to_volume[ch] = 106
for ch in range(1076, 1086): chapter_to_volume[ch] = 107
for ch in range(1086, 1096): chapter_to_volume[ch] = 108
for ch in range(1096, 1106): chapter_to_volume[ch] = 109
for ch in range(1106, 1116): chapter_to_volume[ch] = 110
for ch in range(1116, 1126): chapter_to_volume[ch] = 111
for ch in range(1126, 1150): chapter_to_volume[ch] = 112

def extract_chapter_number(label):
    match = re.search(r'Capítulo\s+(\d+)', label, re.IGNORECASE)
    if match:
        return int(match.group(1))
    
    return None

events_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'events')
events_without_volume = []
updated_count = 0

for filename in os.listdir(events_dir):
    if not filename.endswith('.json'):
        continue
    
    filepath = os.path.join(events_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        event = json.load(f)
    
    if 'sources' not in event or not event['sources']:
        events_without_volume.append({'file': filename, 'reason': 'No sources field'})
        continue
    
    updated = False
    new_sources = []
    
    for source in event['sources']:
        if source.get('type') == 'manga' and 'url' not in source:
            chapter_num = extract_chapter_number(source.get('label', ''))
            if chapter_num and chapter_num in chapter_to_volume:
                volume_num = chapter_to_volume[chapter_num]
                if volume_num in volume_links:
                    new_sources.append({
                        'label': f"Volume {volume_num} - {source['label']}",
                        'url': volume_links[volume_num],
                        'type': 'manga'
                    })
                    updated = True
                else:
                    new_sources.append(source)
                    events_without_volume.append({
                        'file': filename,
                        'reason': f"Volume {volume_num} link not found",
                        'chapter': chapter_num
                    })
            else:
                new_sources.append(source)
                events_without_volume.append({
                    'file': filename,
                    'reason': f"Could not extract chapter number from: {source.get('label', 'N/A')}"
                })
        else:
            new_sources.append(source)
    
    if updated:
        event['sources'] = new_sources
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(event, f, ensure_ascii=False, indent=2)
            f.write('\n')
        print(f"✓ Updated: {filename}")
        updated_count += 1

print(f"\n\n=== SUMMARY ===")
print(f"Total files updated: {updated_count}")
print(f"\n=== EVENTS WITHOUT VOLUME INFORMATION ===\n")
for item in events_without_volume:
    reason = item['reason']
    if 'chapter' in item:
        reason += f" (Chapter {item['chapter']})"
    print(f"- {item['file']}: {reason}")
print(f"\nTotal: {len(events_without_volume)} issues")
