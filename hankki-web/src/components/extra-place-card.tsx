'use client';

import React from 'react';

import type { ExtraPlace } from '@/lib/kakao-map';
import { StarRating } from './star-rating';
import styles from './extra-place-card.module.css';

// 다이닝코드 메뉴표에서 지점과 가격을 확인한 카카오 지도 음식점.
type VerifiedMenu = {
  address: string;
  diningCodeId: string;
  menus: [name: string, price: number][];
};

const verifiedMenus = new Map(Object.entries<VerifiedMenu>({
  "이대조감자탕 주안점": {
    address: "인주대로 259",
    diningCodeId: 'dXRElB99CkiC',
    menus: [["감자탕 중", 40000], ["감자탕 대", 45000], ["묵은지돼지전골", 32000], ["돼지불고기 중", 27000], ["제육볶음 중", 27000]],
  },
  "꼬꼬얼큰이닭발 인하대점": {
    address: "경인남길102번길 51",
    diningCodeId: 'lP9id9bYZCGO',
    menus: [["닭발 소", 14000], ["닭발 중", 21000], ["닭발+날개+똥집", 22000], ["오돌뼈", 12000], ["소금똥집", 12000]],
  },
  "빙그레정육식당": {
    address: "경인남길30번길 45-2",
    diningCodeId: 'cdH4oLuMqbXR',
    menus: [["양념 소갈비살", 16500], ["소고기 된장찌개", 5000], ["비물 함흥냉면", 7000], ["계란찜", 3500]],
  },
  "최강면옥": {
    address: "인하로 157",
    diningCodeId: 'mzSHPO4kGle5',
    menus: [["왕갈비탕", 17000], ["우거지갈비탕", 12000], ["뚝배기불고기", 12000], ["돼지왕갈비", 18000], ["LA소양념갈비", 26000]],
  },
  "효자동솥뚜껑 인하대점": {
    address: "인하로67번길 24-20",
    diningCodeId: 'niNf4o30CYFn',
    menus: [["흑돼지삼겹살 한 판", 35900], ["국물닭발", 17000], ["김치말이국수", 7000], ["김치말이 비빔국수", 7000], ["미나리육회", 13900], ["해장라면", 4900]],
  },
  "원조마포생갈비 인천점": {
    address: "한나루로 377",
    diningCodeId: '1MWDaG4ELJIe',
    menus: [["돼지생갈비", 16000], ["생삼겹살", 16000], ["공깃밥", 1000]],
  },
  "굴세상": {
    address: "매소홀로 355",
    diningCodeId: 'D1lFuTg3NaUb',
    menus: [["굴국밥", 10000], ["바지락칼국수", 10000], ["해초비빔밥", 10000], ["굴버섯돌솥밥", 12000], ["굴영양밥", 15000], ["굴부침", 15000]],
  },
  "경동부추삼겹살": {
    address: "인하로67번길 6-7",
    diningCodeId: 'MAVH3HvHYCYy',
    menus: [["옛날삼겹살", 9500], ["생삼겹살", 10000], ["목살", 10000], ["우겹살(소)", 10000], ["부추삼겹세트", 25000]],
  },
  "고기싸롱 인하대점": {
    address: "인하로 77",
    diningCodeId: 'ber3Ag0ovEYF',
    menus: [["무한리필 1인", 19900], ["무한리필 초등 1~3학년", 11000], ["무한리필 미취학", 8000]],
  },
  "고수찜닭 인하대점": {
    address: "경인남길30번길 34",
    diningCodeId: '0ekLtYpx2i12',
    menus: [["찜닭 소(2인)", 23500], ["찜닭 중(3~4인)", 34500], ["찜닭 대(4~5인)", 44500]],
  },
  "고씨네오리 인하대점": {
    address: "용정공원로83번길 49",
    diningCodeId: 'j0OxisxAc0XP',
    menus: [["반반오리", 43000], ["한방오리백숙(예약)", 70000], ["김치말이국수", 6000], ["비빔국수", 6000], ["어린이돈까스", 5000]],
  },
  "금산양꼬치 본점": {
    address: "경인남길30번길 92",
    diningCodeId: '1FhcMnnOh5si',
    menus: [["양꼬치", 15000], ["양어깨살", 15000], ["지삼선", 17000], ["마라샹궈", 17000], ["어향육사", 16000], ["볶음면", 8000]],
  },
  "교촌치킨 인하대역점": {
    address: "용정공원로83번길 59",
    diningCodeId: 's2IJhv6jdYcX',
    menus: [["허니윙콤비", 24000], ["허니옥수수윙콤비", 25000], ["레드윙콤비", 24000], ["고르곤치즈볼(6개)", 6000]],
  },
  "김밥천국 학익점": {
    address: "매소홀로 355",
    diningCodeId: 'Xt8AyOsz5n6s',
    menus: [["원조김밥", 3800], ["참치주먹밥", 4000], ["떡볶이", 6000], ["쫄면", 7500], ["오므라이스", 8000], ["제육덮밥", 8000], ["순두부찌개", 8000], ["야채비빔밥", 8000]],
  },
  "서해면옥": {
    address: "소성로 166",
    diningCodeId: 'FxzkXqB3jcXO',
    menus: [["물냉면", 10000], ["굴 메밀칼국수", 10000], ["생고기김치찌개", 10000], ["매생이 굴국밥", 10000], ["비빔냉면", 11000], ["반냉면", 11000], ["코다리메밀비빔냉면", 12000]],
  },
  "리차이": {
    address: "한나루로341번길 4",
    diningCodeId: 'oNE4VEMdBj1C',
    menus: [["짜장", 7000], ["소고기짬뽕", 11000], ["생등심 탕수육(미니)", 12000], ["레몬크림새우", 14000], ["양장피(소)", 25000]],
  },
  "숭의갈비": {
    address: "인주대로 270",
    diningCodeId: 'Esp4Hp1fJ9j6',
    menus: [["돼지갈비", 16000], ["묵은지오겹살", 16000], ["황제소갈비살", 17000], ["한우육회", 30000]],
  },
  "아웃닭 인하대점": {
    address: "경인남길30번길 43",
    diningCodeId: 'IzWbSgCER4Xp',
    menus: [["오리지널 후라이드치킨", 22000], ["마틴 간장치킨", 23000], ["순살후라이드", 24900], ["순살양념", 25900], ["매콤소이마요콤보", 25900]],
  },
  "서당골토종순대국 용현점": {
    address: "아암대로45번길 93",
    diningCodeId: 'ZgEi4vv65D4j',
    menus: [["우사골수제순대국", 11000], ["얼큰수제순대국", 12000], ["원조한우대창순대국", 16000], ["토종순대", 7000], ["편육", 7000]],
  },
  "얼레꼴레만두": {
    address: "한나루로 420",
    diningCodeId: 'RoSHft5qFHEy',
    menus: [["떡만이", 4000], ["국물만두", 4000], ["떡순이", 4000], ["떡볶이", 4000], ["만두", 4000], ["순대", 4000]],
  },
  "인하중국집": {
    address: "인주대로174번길 16",
    diningCodeId: 'v6mGld4ECJsm',
    menus: [["짜장면", 6500], ["짬뽕", 8000], ["짜장밥", 6500], ["짬뽕밥", 8000], ["매운짬뽕", 9000], ["쟁반짜장(2인)", 14000]],
  },
  "석호네솥뚜껑닭볶음탕 용현점": {
    address: "독배로 399",
    diningCodeId: 'amC46Ho4rtaG',
    menus: [["닭볶음탕(1인)", 17000], ["묵은지 닭볶음탕(1인)", 20000], ["한우대창 곱도리탕(1인)", 24000], ["어린이 돈까스", 10000]],
  },
  "스시향": {
    address: "한나루로 367",
    diningCodeId: 'jOOU64KhpZjH',
    menus: [["특모듬초밥(15개)", 23000], ["모듬초밥(12개)", 17000], ["유부초밥(10개)", 9000], ["모밀정식", 15000], ["우동정식", 15000], ["모밀", 8000], ["우동", 8000]],
  },
  "남도뽀글이 본점": {
    address: "인하로77번길 48",
    diningCodeId: 'HdpL7lqRjO1b',
    menus: [["소곱창", 16000], ["소막창", 18000], ["대창", 19000], ["소염통", 13000], ["볶음밥", 3000], ["공기밥", 1000]],
  },
  "영화장": {
    address: "독배로 394-1",
    diningCodeId: 'd2cNUnvRs1JS',
    menus: [["짜장면", 6000], ["우동", 7000], ["볶음밥", 7000], ["짬뽕밥", 8000], ["탕수육 소", 20000]],
  },
  "브라운돈까스 인천학익점": {
    address: "한나루로358번길 7",
    diningCodeId: 'TB1bCTBhh6Ht',
    menus: [["매콤 비빔모밀", 8900], ["까르보나라돈까스", 12000], ["콤보돈까스", 12500], ["데리돈까스", 12500], ["홍수치즈돈까스", 14500]],
  },
  "미로곱창": {
    address: "인하로77번길 37",
    diningCodeId: 'vGOYPzhdhOVN',
    menus: [["소금구이 막창(1인분)", 14000], ["양념구이 막창(1인분)", 15000], ["데리야끼 막창(1인분)", 15000], ["불꽃 막창(1인분)", 15000], ["1인막창 실속세트", 19000], ["2인막창 실속세트", 32000]],
  },
}));

const formatPrice = new Intl.NumberFormat('ko-KR');

function getMenu(place: ExtraPlace) {
  const entry = verifiedMenus.get(place.name);
  if (!entry) return undefined;
  // 같은 이름의 다른 지점에 메뉴가 붙지 않도록 도로명과 건물 번호까지 확인한다.
  return place.address.trim().endsWith(` ${entry.address}`) ? entry : undefined;
}
export function ExtraPlaceCard({ place }: { place: ExtraPlace }) {
  const menu = getMenu(place);
  return (
    <div className={styles.card}>
      <div className={styles.name}>{place.name}</div>
      <div className={styles.meta}>
        {place.cat ?? '음식점'} · {place.address}
      </div>
      {menu && (
        <details>
          <summary>메뉴·가격 보기</summary>
          <ul>
            {menu.menus.map(([name, price]) => (
              <li key={name}>{name} · {formatPrice.format(price)}원</li>
            ))}
          </ul>
          <a
            className={styles.link}
            href={`https://www.diningcode.com/profile.php?rid=${menu.diningCodeId}`}
            target="_blank"
            rel="noreferrer">
            다이닝코드 메뉴 출처
          </a>
        </details>
      )}
      <StarRating id={place.id} name={place.name} />
      <a
        className={styles.link}
        href={`https://map.kakao.com/link/map/${encodeURIComponent(place.name)},${place.lat},${place.lng}`}
        target="_blank"
        rel="noreferrer">
        카카오맵에서 보기
      </a>
    </div>
  );
}
