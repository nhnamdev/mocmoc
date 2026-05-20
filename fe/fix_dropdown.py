import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/app/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

zalo = 'http://zalo.me/0858200725'
ao = f'<a href="{zalo}" target="_blank" rel="noopener noreferrer" className="dropdown-item">'
ac = '</a></li>'

# Fix 1: Add missing "Quet so dien thoai" and "Thue tai khoan" after "Dich vu Seo bat dong san"
old1 = 'D\u1ecbch v\u1ee5 Seo b\u1ea5t \u0111\u1ed9ng s\u1ea3n</Link></li>\n \r\n                     </ul>'
new1 = (
    'D\u1ecbch v\u1ee5 Seo b\u1ea5t \u0111\u1ed9ng s\u1ea3n</Link></li>\r\n'
    '                       ' + ao + 'Qu\u00e9t s\u1ed1 \u0111i\u1ec7n tho\u1ea1i truy c\u1eadp website' + ac + '\r\n'
    '                       ' + ao + 'Thu\u00ea t\u00e0i kho\u1ea3n Google Ads' + ac + '\r\n'
    '                     </ul>'
)
c1 = content.replace(old1, new1)
print('Fix1 applied:', c1 != content)
content = c1

# Fix 2: Replace "Quang cao Google Map" Link with a, add Tripadvisor
old2 = 'Qu\u1ea3ng c\u00e1o Google Map</Link></li>\r\n                     </ul>'
new2 = (
    'Qu\u1ea3ng c\u00e1o Google Map</a></li>\r\n'
    '                       ' + ao + 'T\u0103ng review, \u0111\u00e1nh gi\u00e1 Tripadvisor' + ac + '\r\n'
    '                     </ul>'
)
c2 = content.replace(old2, new2)
print('Fix2 applied:', c2 != content)
content = c2

# Fix 3: Add Hosting between Dang ky ten mien and Tao Email
old3 = (
    '\u0110\u0103ng k\u00fd t\u00ean mi\u1ec1n</Link></li>\r\n'
    '                       <li><Link href="' + zalo + '" target="_blank" rel="noopener noreferrer" className="dropdown-item">T\u1ea1o Email doanh nghi\u1ec7p</Link></li>'
)
new3 = (
    '\u0110\u0103ng k\u00fd t\u00ean mi\u1ec1n</a></li>\r\n'
    '                       ' + ao + 'Hosting' + ac + '\r\n'
    '                       ' + ao + 'T\u1ea1o Email doanh nghi\u1ec7p' + ac
)
c3 = content.replace(old3, new3)
print('Fix3 applied:', c3 != content)
content = c3

with open('src/app/page.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('ALL DONE')
