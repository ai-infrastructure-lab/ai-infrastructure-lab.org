<script setup lang="ts">
const { data: items } = await useAsyncData("datawalks-list", () =>
  queryCollection("pages")
    .where("path", "LIKE", "/datawalks/%")
    .where("status", "=", "published")
    .order("date", "DESC")
    .limit(3)
    .all(),
);

const routeLandscapes = [
  {
    terrain: [
      "M0 94 C150 58 280 64 420 92 C570 124 700 42 870 76 C1025 104 1154 78 1284 54 C1364 40 1418 48 1440 52",
      "M0 126 C180 106 320 112 484 130 C658 150 795 104 974 122 C1130 138 1274 108 1440 124",
      "M0 151 C178 140 330 145 486 153 C670 164 820 138 988 150 C1158 162 1290 145 1440 154",
    ],
    route:
      "M108 116 C205 86 292 100 384 78 C492 52 588 82 700 66 C818 48 908 88 1014 72 C1130 56 1220 80 1328 46",
    nodes: [
      [108, 116],
      [384, 78],
      [700, 66],
      [1014, 72],
      [1328, 46],
    ],
  },
  {
    terrain: [
      "M0 78 C120 42 240 70 352 58 C486 44 590 18 724 52 C854 86 930 82 1056 50 C1190 16 1312 42 1440 36",
      "M0 118 C172 100 312 122 470 108 C652 92 792 124 952 106 C1124 88 1282 110 1440 96",
      "M0 150 C210 136 388 154 560 146 C742 138 898 156 1070 145 C1230 134 1340 142 1440 138",
    ],
    route:
      "M122 54 C230 80 330 46 448 62 C550 76 612 110 742 96 C900 78 972 34 1118 42 C1218 48 1294 68 1368 34",
    nodes: [
      [122, 54],
      [448, 62],
      [742, 96],
      [1118, 42],
      [1368, 34],
    ],
  },
  {
    terrain: [
      "M0 104 C120 92 214 52 346 68 C484 84 610 118 754 84 C890 52 1040 54 1178 78 C1288 98 1368 80 1440 66",
      "M0 132 C164 120 300 136 462 122 C642 106 778 138 948 128 C1126 118 1280 130 1440 112",
      "M0 156 C176 148 328 152 500 158 C692 164 822 144 1002 154 C1174 164 1308 150 1440 156",
    ],
    route:
      "M78 126 C170 118 248 88 350 94 C448 100 510 132 624 118 C748 102 812 64 932 70 C1064 78 1128 110 1260 98 C1328 92 1380 72 1410 58",
    nodes: [
      [78, 126],
      [350, 94],
      [624, 118],
      [932, 70],
      [1260, 98],
      [1410, 58],
    ],
  },
  {
    terrain: [
      "M0 62 C178 92 300 86 436 56 C596 20 696 32 838 70 C988 110 1134 86 1270 44 C1340 22 1394 24 1440 38",
      "M0 112 C148 126 302 104 458 116 C636 130 770 100 940 112 C1112 124 1262 94 1440 102",
      "M0 148 C182 154 344 142 520 150 C700 158 870 144 1044 150 C1200 156 1318 146 1440 150",
    ],
    route:
      "M82 70 C174 92 260 72 366 82 C486 94 560 46 692 48 C830 50 878 104 1014 100 C1154 96 1234 56 1360 42",
    nodes: [
      [82, 70],
      [366, 82],
      [692, 48],
      [1014, 100],
      [1360, 42],
    ],
  },
  {
    terrain: [
      "M0 86 C132 46 272 44 402 76 C536 110 636 104 764 74 C918 38 1044 46 1184 80 C1300 108 1374 92 1440 74",
      "M0 122 C168 94 314 112 480 128 C654 144 798 114 966 122 C1144 132 1294 104 1440 116",
      "M0 153 C160 146 320 158 488 151 C672 143 830 160 1014 150 C1196 140 1328 152 1440 146",
    ],
    route:
      "M104 96 C210 58 288 66 394 92 C500 118 578 120 690 94 C816 64 902 62 1018 82 C1140 102 1242 112 1344 82",
    nodes: [
      [104, 96],
      [394, 92],
      [690, 94],
      [1018, 82],
      [1344, 82],
    ],
  },
  {
    terrain: [
      "M0 112 C100 72 212 96 326 74 C466 46 578 18 712 46 C850 74 944 118 1090 86 C1226 56 1334 34 1440 52",
      "M0 136 C174 112 326 128 492 116 C660 104 808 140 976 124 C1148 108 1282 122 1440 104",
      "M0 158 C180 150 354 156 528 151 C704 146 868 158 1040 152 C1210 146 1328 154 1440 148",
    ],
    route:
      "M92 120 C158 86 248 104 332 76 C418 48 512 52 604 40 C718 26 790 58 884 84 C1014 120 1088 96 1206 70 C1292 52 1352 56 1400 46",
    nodes: [
      [92, 120],
      [332, 76],
      [604, 40],
      [884, 84],
      [1206, 70],
      [1400, 46],
    ],
  },
  {
    terrain: [
      "M0 72 C126 96 240 104 372 72 C522 36 632 72 778 86 C930 100 1034 60 1172 42 C1292 26 1376 48 1440 64",
      "M0 116 C164 130 318 108 486 120 C652 132 800 106 970 116 C1144 126 1286 108 1440 116",
      "M0 150 C174 158 342 146 520 152 C704 158 858 146 1036 152 C1206 158 1324 148 1440 152",
    ],
    route:
      "M86 58 C192 88 276 112 394 94 C512 76 576 50 694 66 C816 82 900 108 1026 86 C1168 62 1242 34 1364 58",
    nodes: [
      [86, 58],
      [394, 94],
      [694, 66],
      [1026, 86],
      [1364, 58],
    ],
  },
  {
    terrain: [
      "M0 98 C150 64 276 80 424 104 C580 130 690 72 834 54 C990 34 1086 68 1220 88 C1316 102 1384 86 1440 70",
      "M0 128 C164 110 318 118 484 134 C666 152 800 118 970 126 C1140 134 1278 112 1440 118",
      "M0 154 C184 142 338 154 510 158 C692 162 846 145 1024 153 C1198 161 1320 149 1440 154",
    ],
    route:
      "M102 112 C206 90 294 102 398 120 C508 138 570 106 674 86 C808 60 916 42 1042 56 C1168 70 1268 102 1372 74",
    nodes: [
      [102, 112],
      [398, 120],
      [674, 86],
      [1042, 56],
      [1372, 74],
    ],
  },
  {
    terrain: [
      "M0 54 C122 42 216 76 336 72 C478 68 570 34 704 32 C850 30 942 66 1082 72 C1216 78 1318 46 1440 38",
      "M0 108 C150 84 298 112 458 102 C638 90 774 116 948 106 C1130 96 1286 116 1440 92",
      "M0 148 C190 134 352 152 526 146 C704 140 868 154 1044 146 C1212 138 1330 146 1440 140",
    ],
    route:
      "M76 70 C180 52 254 86 360 86 C476 86 534 50 646 44 C780 36 848 58 960 80 C1094 106 1172 102 1288 70 C1340 56 1380 46 1414 46",
    nodes: [
      [76, 70],
      [360, 86],
      [646, 44],
      [960, 80],
      [1288, 70],
      [1414, 46],
    ],
  },
  {
    terrain: [
      "M0 116 C128 72 246 44 382 62 C528 82 638 128 786 104 C934 80 1006 28 1152 46 C1274 62 1356 96 1440 84",
      "M0 136 C160 116 310 132 478 122 C658 112 798 140 968 128 C1144 116 1288 132 1440 112",
      "M0 158 C170 150 330 156 500 152 C690 148 852 160 1036 152 C1206 144 1326 154 1440 148",
    ],
    route:
      "M82 128 C172 92 232 66 346 68 C456 70 520 104 632 120 C770 140 836 100 940 72 C1068 38 1148 52 1256 68 C1328 78 1386 96 1412 82",
    nodes: [
      [82, 128],
      [346, 68],
      [632, 120],
      [940, 72],
      [1256, 68],
      [1412, 82],
    ],
  },
];

const getRouteLandscape = (index: number) =>
  routeLandscapes[index % routeLandscapes.length];

const getDiscPath = (cx: number, cy: number, radius: number) =>
  [
    `M ${cx - radius} ${cy}`,
    `a ${radius} ${radius} 0 1 0 ${radius * 2} 0`,
    `a ${radius} ${radius} 0 1 0 -${radius * 2} 0`,
  ].join(" ");
</script>

<template>
  <ContentSection title="Data walks" to="/datawalks" content-class="grid gap-4">
    <NuxtLink
      v-for="(item, index) in items"
      :key="item.path"
      :to="item.path"
      class="glow-card group relative min-h-80 overflow-hidden rounded-md border border-fg/10 bg-bg2 p-5 tracking-normal text-fg no-underline transition"
    >
      <div class="relative z-10 max-w-2xl">
        <time
          v-if="item.date"
          :datetime="new Date(item.date).toISOString()"
          class="text-xs font-normal uppercase tracking-normal"
        >
          {{
            new Date(item.date).toLocaleDateString("en", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}
        </time>
        <h3
          class="mt-2 text-5xl! font-normal! normal-case! tracking-normal! text-fg"
        >
          {{ item.title }}
        </h3>
        <p class="mt-2 text-[clamp(0.86rem,1.2vw,1.05rem)]! leading-[1.55]! tracking-normal! text-fg2">
          {{ item.description }}
        </p>
        <span class="card-read-more">Read more</span>
      </div>

      <div
        class="absolute inset-x-0 bottom-0 h-36 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          class="absolute inset-x-0 bottom-0 h-full w-full text-fg/25 transition group-hover:text-hi/35"
          viewBox="0 0 1440 160"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="currentColor" stroke-linecap="round">
            <path
              v-for="(line, lineIndex) in getRouteLandscape(index).terrain"
              :key="`${item.path}-terrain-${lineIndex}`"
              :d="line"
              :stroke-width="lineIndex === 0 ? 3 : 2"
              :opacity="lineIndex === 0 ? 1 : lineIndex === 1 ? 0.62 : 0.45"
              vector-effect="non-scaling-stroke"
            />
          </g>

          <g class="text-hi/60 transition group-hover:text-hi/90">
            <path
              :d="getRouteLandscape(index).route"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
              stroke-dasharray="1 15"
              vector-effect="non-scaling-stroke"
              fill="none"
            />
            <g
              v-for="([cx, cy], nodeIndex) in getRouteLandscape(index).nodes"
              :key="`${item.path}-node-${nodeIndex}`"
            >
              <path
                :d="getDiscPath(cx, cy, 8)"
                fill="currentColor"
                opacity="0.16"
              />
              <path :d="getDiscPath(cx, cy, 3.5)" fill="currentColor" />
            </g>
          </g>
        </svg>
      </div>
    </NuxtLink>
  </ContentSection>
</template>
