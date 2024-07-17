interface ColorPattern {
    name: string;
    colors: {
      r: number;
      g: number;
      b: number;
    }[];
  }
  
  interface SvgTemplate {
    id: string;
    svg: string;
  }
  
  export const svgTemplates: SvgTemplate[] = [
    {
        id: "wave-gradient",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'>
            <rect fill='{{color1}}' width='1600' height='800'/>
            <g fill-opacity='1'>
              <path fill='{{color2}}'  d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/>
              <path fill='{{color3}}'  d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/>
              <path fill='{{color4}}'  d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/>
              <path fill='{{color5}}'  d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/>
              <path fill='{{color6}}'  d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/>
              <path fill='{{color7}}'  d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/>
              <path fill='{{color8}}'  d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/>
              <path fill='{{color9}}'  d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/>
              <path fill='{{color10}}' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/>
              <path fill='{{color11}}' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/>
            </g>
          </svg>
        `
      },
    
    {
        id: "abstract-waves",
        svg: `
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="grad1" gradientUnits="userSpaceOnUse" x1="911.4786" y1="398.704" x2="1205.4775" y2="417.5501">
                <stop offset="0" style="stop-color:{{color1}}"/>
                <stop offset="1" style="stop-color:{{color2}}"/>
              </linearGradient>
              <linearGradient id="grad2" gradientUnits="userSpaceOnUse" x1="1003.0976" y1="753.2682" x2="677.1404" y2="61.3577">
                <stop offset="0" style="stop-color:{{color3}}"/>
                <stop offset="1" style="stop-color:{{color4}}"/>
              </linearGradient>
              <linearGradient id="grad3" gradientUnits="userSpaceOnUse" x1="628.2993" y1="710.4178" x2="668.7748" y2="920.0229">
                <stop offset="0" style="stop-color:{{color5}}"/>
                <stop offset="1" style="stop-color:{{color6}}"/>
              </linearGradient>
            </defs>
            <g id="Background">
              <rect style="fill:{{color7}};" width="1200" height="800"/>
            </g>
            <g id="Graphic_elements">
              <path style="fill:url(#grad1);" d="M952.404,32.525c26.658,82.09,386.912,493.384-259.818,704.454c0,0-51.192,42.437,39.096,54.72c90.289,12.283,434.154,0,434.154,0V9.672L952.404,32.525z"/>
              <path style="fill:url(#grad2);" d="M947.232-10.169c0,35.929-1.806,62.866,104.718,188.571s117.357,229.604,37.915,333.503c-79.442,103.899-447.761,275.781-626.505,277.064H1200V-10.169H947.232z"/>
              <path style="fill:{{color8}};" d="M47.531,811.114c47.168-61.77,159.962-128.281,531.155-119.552c371.194,8.729,629.593-161.808,629.593-161.808v281.36H47.531L47.531,811.114z"/>
              <path style="fill:url(#grad3);" d="M67.099,842.349c47.168-61.77,140.394-128.28,511.587-119.552s629.593-148.388,629.593-148.388v267.94H47.531H67.099z"/>
            </g>
          </svg>
        `
      },
    {
        id: "layered-peaks",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'>
            <rect fill='{{color1}}' width='1600' height='800'/>
            <g fill-opacity='1'>
              <polygon fill='{{color2}}' points='800 100 0 200 0 800 1600 800 1600 200'/>
              <polygon fill='{{color3}}' points='800 200 0 400 0 800 1600 800 1600 400'/>
              <polygon fill='{{color4}}' points='800 300 0 600 0 800 1600 800 1600 600'/>
              <polygon fill='{{color5}}' points='1600 800 800 400 0 800'/>
              <polygon fill='{{color6}}' points='1280 800 800 500 320 800'/>
              <polygon fill='{{color7}}' points='533.3 800 1066.7 800 800 600'/>
              <polygon fill='{{color8}}' points='684.1 800 914.3 800 800 700'/>
            </g>
          </svg>
        `
      },
    {
        id: "radial-bloom",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'>
            <rect fill='{{color1}}' width='2000' height='1500'/>
            <defs>
              <radialGradient id='a' gradientUnits='objectBoundingBox'>
                <stop offset='0' stop-color='{{color2}}'/>
                <stop offset='1' stop-color='{{color1}}'/>
              </radialGradient>
              <linearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'>
                <stop offset='0' stop-color='{{color3}}'/>
                <stop offset='1' stop-color='{{color1}}'/>
              </linearGradient>
              <path id='s' fill='url(#b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/>
              <g id='g'>
                <use href='#s' transform='scale(0.12) rotate(60)'/>
                <use href='#s' transform='scale(0.2) rotate(10)'/>
                <use href='#s' transform='scale(0.25) rotate(40)'/>
                <use href='#s' transform='scale(0.3) rotate(-20)'/>
                <use href='#s' transform='scale(0.4) rotate(-30)'/>
                <use href='#s' transform='scale(0.5) rotate(20)'/>
                <use href='#s' transform='scale(0.6) rotate(60)'/>
                <use href='#s' transform='scale(0.7) rotate(10)'/>
                <use href='#s' transform='scale(0.835) rotate(-40)'/>
                <use href='#s' transform='scale(0.9) rotate(40)'/>
                <use href='#s' transform='scale(1.05) rotate(25)'/>
                <use href='#s' transform='scale(1.2) rotate(8)'/>
                <use href='#s' transform='scale(1.333) rotate(-60)'/>
                <use href='#s' transform='scale(1.45) rotate(-30)'/>
                <use href='#s' transform='scale(1.6) rotate(10)'/>
              </g>
            </defs>
            <g transform='rotate(0 0 0)'>
              <g transform='rotate(0 0 0)'>
                <circle fill='url(#a)' r='3000'/>
                <g opacity='0.5'>
                  <circle fill='url(#a)' r='2000'/>
                  <circle fill='url(#a)' r='1800'/>
                  <circle fill='url(#a)' r='1700'/>
                  <circle fill='url(#a)' r='1651'/>
                  <circle fill='url(#a)' r='1450'/>
                  <circle fill='url(#a)' r='1250'/>
                  <circle fill='url(#a)' r='1175'/>
                  <circle fill='url(#a)' r='900'/>
                  <circle fill='url(#a)' r='750'/>
                  <circle fill='url(#a)' r='500'/>
                  <circle fill='url(#a)' r='380'/>
                  <circle fill='url(#a)' r='250'/>
                </g>
                <g transform='rotate(0 0 0)'>
                  <use href='#g' transform='rotate(10)'/>
                  <use href='#g' transform='rotate(120)'/>
                  <use href='#g' transform='rotate(240)'/>
                </g>
                <circle fill-opacity='0.1' fill='url(#a)' r='3000'/>
              </g>
            </g>
          </svg>
        `
      },
    {
        id: "concentric-circles",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'>
            <rect fill='{{color1}}' width='1600' height='800'/>
            <g stroke='{{color2}}' stroke-width='66.7' stroke-opacity='0.05'>
              <circle fill='{{color3}}' cx='0' cy='0' r='1800'/>
              <circle fill='{{color4}}' cx='0' cy='0' r='1700'/>
              <circle fill='{{color5}}' cx='0' cy='0' r='1600'/>
              <circle fill='{{color6}}' cx='0' cy='0' r='1500'/>
              <circle fill='{{color7}}' cx='0' cy='0' r='1400'/>
              <circle fill='{{color8}}' cx='0' cy='0' r='1300'/>
              <circle fill='{{color9}}' cx='0' cy='0' r='1200'/>
              <circle fill='{{color10}}' cx='0' cy='0' r='1100'/>
              <circle fill='{{color11}}' cx='0' cy='0' r='1000'/>
              <circle fill='{{color12}}' cx='0' cy='0' r='900'/>
              <circle fill='{{color13}}' cx='0' cy='0' r='800'/>
              <circle fill='{{color14}}' cx='0' cy='0' r='700'/>
              <circle fill='{{color15}}' cx='0' cy='0' r='600'/>
              <circle fill='{{color16}}' cx='0' cy='0' r='500'/>
              <circle fill='{{color17}}' cx='0' cy='0' r='400'/>
              <circle fill='{{color18}}' cx='0' cy='0' r='300'/>
              <circle fill='{{color19}}' cx='0' cy='0' r='200'/>
              <circle fill='{{color20}}' cx='0' cy='0' r='100'/>
            </g>
          </svg>
        `
      },
    {
        id: "geometric-spiral",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'>
            <rect fill='{{color1}}' width='2000' height='1500'/>
            <defs>
              <path fill='none' stroke-width='200' stroke-opacity='0.29' id='a' d='M0.74-509.63l485.39 352.65l-185.4 570.61h-599.97l-185.4-570.61L0.74-509.63 M0.74-510.87l-486.56 353.51l185.85 571.99h601.42L487.3-157.36L0.74-510.87L0.74-510.87z'/>
            </defs>
            <g transform='' style='transform-origin:center'>
              <g transform='rotate(62.64 0 0)' style='transform-origin:center'>
                <g transform='rotate(-160 0 0)' style='transform-origin:center'>
                  <g transform='translate(1000 750)'>
                    <use stroke='{{color2}}' href='#a' transform='rotate(10 0 0) scale(1.1)'/>
                    <use stroke='{{color3}}' href='#a' transform='rotate(20 0 0) scale(1.2)'/>
                    <use stroke='{{color4}}' href='#a' transform='rotate(30 0 0) scale(1.3)'/>
                    <use stroke='{{color5}}' href='#a' transform='rotate(40 0 0) scale(1.4)'/>
                    <use stroke='{{color6}}' href='#a' transform='rotate(50 0 0) scale(1.5)'/>
                    <use stroke='{{color7}}' href='#a' transform='rotate(60 0 0) scale(1.6)'/>
                    <use stroke='{{color8}}' href='#a' transform='rotate(70 0 0) scale(1.7)'/>
                    <use stroke='{{color9}}' href='#a' transform='rotate(80 0 0) scale(1.8)'/>
                    <use stroke='{{color10}}' href='#a' transform='rotate(90 0 0) scale(1.9)'/>
                    <use stroke='{{color11}}' href='#a' transform='rotate(100 0 0) scale(2)'/>
                    <use stroke='{{color12}}' href='#a' transform='rotate(110 0 0) scale(2.1)'/>
                    <use stroke='{{color13}}' href='#a' transform='rotate(120 0 0) scale(2.2)'/>
                    <use stroke='{{color14}}' href='#a' transform='rotate(130 0 0) scale(2.3)'/>
                    <use stroke='{{color15}}' href='#a' transform='rotate(140 0 0) scale(2.4)'/>
                    <use stroke='{{color16}}' href='#a' transform='rotate(150 0 0) scale(2.5)'/>
                    <use stroke='{{color17}}' href='#a' transform='rotate(160 0 0) scale(2.6)'/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        `
      },
    {
        id: "angular-polygons",
        
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'>
            <rect fill='{{color1}}' width='1600' height='900'/>
            <polygon fill='{{color2}}'  points='957 450 539 900 1396 900'/>
            <polygon fill='{{color3}}'  points='957 450 872.9 900 1396 900'/>
            <polygon fill='{{color4}}'  points='-60 900 398 662 816 900'/>
            <polygon fill='{{color5}}'  points='337 900 398 662 816 900'/>
            <polygon fill='{{color6}}'  points='1203 546 1552 900 876 900'/>
            <polygon fill='{{color7}}'  points='1203 546 1552 900 1162 900'/>
            <polygon fill='{{color8}}'  points='641 695 886 900 367 900'/>
            <polygon fill='{{color9}}'  points='587 900 641 695 886 900'/>
            <polygon fill='{{color10}}' points='1710 900 1401 632 1096 900'/>
            <polygon fill='{{color11}}' points='1710 900 1401 632 1365 900'/>
            <polygon fill='{{color12}}' points='1210 900 971 687 725 900'/>
            <polygon fill='{{color13}}' points='943 900 1210 900 971 687'/>
          </svg>
        `
      },
    {
        id: "geometric-gradient",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 200 200'>
            <rect fill='{{color1}}' width='200' height='200'/>
            <defs>
              <linearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'>
                <stop offset='0' stop-color='{{color2}}'/>
                <stop offset='1' stop-color='{{color3}}'/>
              </linearGradient>
              <linearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'>
                <stop offset='0' stop-color='{{color4}}'/>
                <stop offset='0.09' stop-color='{{color5}}'/>
                <stop offset='0.18' stop-color='{{color6}}'/>
                <stop offset='0.31' stop-color='{{color7}}'/>
                <stop offset='0.44' stop-color='{{color8}}'/>
                <stop offset='0.59' stop-color='{{color9}}'/>
                <stop offset='0.75' stop-color='{{color10}}'/>
                <stop offset='1' stop-color='{{color11}}'/>
              </linearGradient>
              <filter id='c' x='0' y='0' width='200%' height='200%'>
                <feGaussianBlur in='SourceGraphic' stdDeviation='12' />
              </filter>
            </defs>
            <polygon fill='url(#a)' points='0 174 0 0 174 0'/>
            <path fill='{{color12}}' fill-opacity='.5' filter='url(#c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/>
            <path fill='url(#b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/>
          </svg>
        `
      },
    
    {
        id: "complex-pattern",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <defs>
              <linearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%' gradientTransform='rotate(240)'>
                <stop offset='0' stop-color='{{color1}}'/>
                <stop offset='1' stop-color='{{color2}}'/>
              </linearGradient>
              <pattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'>
                <g fill-opacity='0.1'>
                  <polygon fill='{{color3}}' points='90 150 0 300 180 300'/>
                  <polygon points='90 150 180 0 0 0'/>
                  <polygon fill='{{color4}}' points='270 150 360 0 180 0'/>
                  <polygon fill='{{color5}}' points='450 150 360 300 540 300'/>
                  <polygon fill='{{color6}}' points='450 150 540 0 360 0'/>
                  <polygon points='630 150 540 300 720 300'/>
                  <polygon fill='{{color5}}' points='630 150 720 0 540 0'/>
                  <polygon fill='{{color3}}' points='810 150 720 300 900 300'/>
                  <polygon fill='{{color7}}' points='810 150 900 0 720 0'/>
                  <polygon fill='{{color5}}' points='990 150 900 300 1080 300'/>
                  <polygon fill='{{color3}}' points='990 150 1080 0 900 0'/>
                  <polygon fill='{{color5}}' points='90 450 0 600 180 600'/>
                  <polygon points='90 450 180 300 0 300'/>
                  <polygon fill='{{color6}}' points='270 450 180 600 360 600'/>
                  <polygon fill='{{color4}}' points='270 450 360 300 180 300'/>
                  <polygon fill='{{color5}}' points='450 450 360 600 540 600'/>
                  <polygon fill='{{color6}}' points='450 450 540 300 360 300'/>
                  <polygon fill='{{color6}}' points='630 450 540 600 720 600'/>
                  <polygon fill='{{color7}}' points='630 450 720 300 540 300'/>
                  <polygon points='810 450 720 600 900 600'/>
                  <polygon fill='{{color5}}' points='810 450 900 300 720 300'/>
                  <polygon fill='{{color4}}' points='990 450 900 600 1080 600'/>
                  <polygon fill='{{color3}}' points='990 450 1080 300 900 300'/>
                  <polygon fill='{{color3}}' points='90 750 0 900 180 900'/>
                  <polygon points='270 750 180 900 360 900'/>
                  <polygon fill='{{color5}}' points='270 750 360 600 180 600'/>
                  <polygon points='450 750 540 600 360 600'/>
                  <polygon points='630 750 540 900 720 900'/>
                  <polygon fill='{{color3}}' points='630 750 720 600 540 600'/>
                  <polygon fill='{{color4}}' points='810 750 720 900 900 900'/>
                  <polygon fill='{{color6}}' points='810 750 900 600 720 600'/>
                  <polygon fill='{{color6}}' points='990 750 900 900 1080 900'/>
                  <polygon fill='{{color6}}' points='180 0 90 150 270 150'/>
                  <polygon fill='{{color3}}' points='360 0 270 150 450 150'/>
                  <polygon fill='{{color7}}' points='540 0 450 150 630 150'/>
                  <polygon points='900 0 810 150 990 150'/>
                  <polygon fill='{{color3}}' points='0 300 -90 450 90 450'/>
                  <polygon fill='{{color7}}' points='0 300 90 150 -90 150'/>
                  <polygon fill='{{color7}}' points='180 300 90 450 270 450'/>
                  <polygon fill='{{color6}}' points='180 300 270 150 90 150'/>
                  <polygon fill='{{color3}}' points='360 300 270 450 450 450'/>
                  <polygon fill='{{color7}}' points='360 300 450 150 270 150'/>
                  <polygon fill='{{color3}}' points='540 300 450 450 630 450'/>
                  <polygon fill='{{color3}}' points='540 300 630 150 450 150'/>
                  <polygon fill='{{color4}}' points='720 300 630 450 810 450'/>
                  <polygon fill='{{color6}}' points='720 300 810 150 630 150'/>
                  <polygon fill='{{color7}}' points='900 300 810 450 990 450'/>
                  <polygon fill='{{color6}}' points='900 300 990 150 810 150'/>
                  <polygon points='0 600 -90 750 90 750'/>
                  <polygon fill='{{color6}}' points='0 600 90 450 -90 450'/>
                  <polygon fill='{{color4}}' points='180 600 90 750 270 750'/>
                  <polygon fill='{{color3}}' points='180 600 270 450 90 450'/>
                  <polygon fill='{{color3}}' points='360 600 270 750 450 750'/>
                  <polygon fill='{{color6}}' points='360 600 450 450 270 450'/>
                  <polygon fill='{{color6}}' points='540 600 630 450 450 450'/>
                  <polygon fill='{{color3}}' points='720 600 630 750 810 750'/>
                  <polygon fill='{{color7}}' points='900 600 810 750 990 750'/>
                  <polygon fill='{{color3}}' points='900 600 990 450 810 450'/>
                  <polygon fill='{{color5}}' points='0 900 90 750 -90 750'/>
                  <polygon fill='{{color3}}' points='180 900 270 750 90 750'/>
                  <polygon fill='{{color7}}' points='360 900 450 750 270 750'/>
                  <polygon fill='{{color4}}' points='540 900 630 750 450 750'/>
                  <polygon fill='{{color7}}' points='720 900 810 750 630 750'/>
                  <polygon fill='{{color3}}' points='900 900 990 750 810 750'/>
                  <polygon fill='{{color3}}' points='1080 300 990 450 1170 450'/>
                  <polygon fill='{{color7}}' points='1080 300 1170 150 990 150'/>
                  <polygon points='1080 600 990 750 1170 750'/>
                  <polygon fill='{{color6}}' points='1080 600 1170 450 990 450'/>
                  <polygon fill='{{color5}}' points='1080 900 1170 750 990 750'/>
                </g>
              </pattern>
            </defs>
            <rect x='0' y='0' fill='url(#a)' width='100%' height='100%'/>
            <rect x='0' y='0' fill='url(#b)' width='100%' height='100%'/>
          </svg>
        `
      },
      {
        id: "line-pattern",
        svg: `
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 800 800'>
            <rect fill='{{color1}}' width='800' height='800'/>
            <g fill='none' stroke='{{color2}}' stroke-width='1'>
              <path d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/>
              <path d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/>
              <path d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/>
              <path d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/>
              <path d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/>
            </g>
            <g fill='{{color3}}'>
              <circle cx='769' cy='229' r='5'/>
              <circle cx='539' cy='269' r='5'/>
              <circle cx='603' cy='493' r='5'/>
              <circle cx='731' cy='737' r='5'/>
              <circle cx='520' cy='660' r='5'/>
              <circle cx='309' cy='538' r='5'/>
              <circle cx='295' cy='764' r='5'/>
              <circle cx='40' cy='599' r='5'/>
              <circle cx='102' cy='382' r='5'/>
              <circle cx='127' cy='80' r='5'/>
              <circle cx='370' cy='105' r='5'/>
              <circle cx='578' cy='42' r='5'/>
              <circle cx='237' cy='261' r='5'/>
              <circle cx='390' cy='382' r='5'/>
            </g>
          </svg>
        `
      }
  ];
  

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  const applyColorsToSvg = (svg: string, colors: string[]): string => {
    let result = svg;
    colors.forEach((color, index) => {
      const regex = new RegExp(`{{color${index + 1}}}`, 'g');
      result = result.replace(regex, color);
    });
    return result;
  };
  
  const generateColorGradient = (startColor: string, endColor: string, steps: number): string[] => {
    const start = startColor.match(/\w\w/g)!.map(hex => parseInt(hex, 16));
    const end = endColor.match(/\w\w/g)!.map(hex => parseInt(hex, 16));
    
    return Array.from({length: steps}, (_, i) => {
      const r = Math.round(start[0] + (end[0] - start[0]) * i / (steps - 1));
      const g = Math.round(start[1] + (end[1] - start[1]) * i / (steps - 1));
      const b = Math.round(start[2] + (end[2] - start[2]) * i / (steps - 1));
      return rgbToHex(r / 255, g / 255, b / 255);
    });
  };
  
  

  
  export const generateCreativeProfessionalBackground = (colorPattern: ColorPattern, selectedTemplate: SvgTemplate): string => {
    const colors = colorPattern.colors.map(color => rgbToHex(color.r, color.g, color.b));
  
    // Ensure we have at least 7 colors (maximum needed by any template)
    while (colors.length < 7) {
      colors.push(colors[colors.length - 1]);
    }
  
    let coloredSvg: string;
    const getColor = (index: number) => colors[index] || colors[colors.length - 1];

    switch (selectedTemplate.id) {
      case "layered-waves":
        const waveColors = generateColorGradient(colors[1], colors[2], 5);
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, [colors[0], ...waveColors]);
        break;
      case "complex-pattern":
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, colors);
        break;
      case "line-pattern":
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, [colors[0], colors[1], colors[2]]);
        break;
      case "radial-gradient":
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, [colors[0], colors[1], colors[2]]);
        break;
      case "wave-gradient":
        const waveColors2 = generateColorGradient(colors[0], colors[colors.length - 1], 11);
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, waveColors2);
        break;
      case "angular-polygons":
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, colors);
        break;
        case "geometric-spiral":
            const spiralColors = generateColorGradient(colors[0], colors[colors.length - 1], 17);
            coloredSvg = applyColorsToSvg(selectedTemplate.svg, spiralColors);
            break;
            case "concentric-circles":
                const circleColors = generateColorGradient(colors[0], colors[colors.length - 1], 20);
                coloredSvg = applyColorsToSvg(selectedTemplate.svg, circleColors);
                break;
                case "radial-bloom":
                    const bloomColors = [
                      colors[0], // Base color
                      colors[1] || colors[0], // Radial gradient start color
                      colors[2] || colors[1] || colors[0] // Linear gradient start color
                    ];
                    coloredSvg = applyColorsToSvg(selectedTemplate.svg, bloomColors);
                    break;
                    case "layered-peaks":
                        const peakColors = generateColorGradient(colors[0], colors[colors.length - 1], 8);
                        coloredSvg = applyColorsToSvg(selectedTemplate.svg, peakColors);
                        break;
                        case "abstract-waves":
                            const waveColorss = [
                              getColor(0), // color1
                              getColor(1), // color2
                              getColor(2), // color3
                              getColor(3), // color4
                              getColor(4), // color5
                              getColor(5), // color6
                              getColor(6), // color7 (background)
                              getColor(7), // color8 (solid fill)
                            ];
                            coloredSvg = applyColorsToSvg(selectedTemplate.svg, waveColorss);
                            break;
      default:
        coloredSvg = applyColorsToSvg(selectedTemplate.svg, colors);
    }
  
    return coloredSvg;
  };
  
  // Add this function to get a template by ID with a fallback
  export const getTemplateById = (id: string): SvgTemplate => {
    const template = svgTemplates.find(t => t.id === id);
    return template || svgTemplates[0]; // Fallback to the first template if not found
  };