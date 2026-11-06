(() => {
  'use strict';

  const SAVE_KEY = 'band-save-v4';
  const PREVIOUS_SAVE_KEY = 'band-save-v3';
  const OLDER_SAVE_KEY = 'band-save-v2';
  const OLD_SAVE_KEY = 'band12-save-v1';
  const TITLE_HISTORY_KEY = 'band-used-song-titles-v1';
  const app = document.querySelector('#app');
  const positions = [
    { role: '보컬', icon: 'VO', color: '#f79c9c' },
    { role: '기타', icon: 'GT', color: '#efb666' },
    { role: '베이스', icon: 'BA', color: '#93b5ff' },
    { role: '드럼', icon: 'DR', color: '#ca9aff' },
    { role: '키보드', icon: 'KY', color: '#91dfc4' }
  ];
  const traits = [
    { id: 'virtuoso', name: '연습벌레', kind: 'positive', desc: '연주력 +8 · 개인 연습 +1', effects: { startSkill: 8, practice: 1 } },
    { id: 'showman', name: '무대 체질', kind: 'positive', desc: '무대 매력 +10', effects: { startCharm: 10 } },
    { id: 'iron', name: '강철 체력', kind: 'positive', desc: '최대 체력 +15', effects: { maxEnergy: 15 } },
    { id: 'leader', name: '팀 리더', kind: 'positive', desc: '합주 팀 호흡 +2', effects: { ensemble: 2 } },
    { id: 'marketer', name: '홍보 천재', kind: 'positive', desc: '홍보 기대감 +6', effects: { promo: 6 } },
    { id: 'frugal', name: '알뜰 장인', kind: 'positive', desc: '장비 가격 -35원', effects: { gearCost: -35 } },
    { id: 'fast', name: '속성 학습', kind: 'positive', desc: '개인 연습 성장 +2', effects: { practice: 2 } },
    { id: 'groove', name: '리듬 마스터', kind: 'positive', desc: '공연 점수 +5', effects: { showScore: 5 } },
    { id: 'fan', name: '팬 서비스', kind: 'positive', desc: '공연 팬 증가 +15%', effects: { fanRate: .15 } },
    { id: 'gearhead', name: '장비 덕후', kind: 'positive', desc: '장비 보유 시 공연 +2', effects: { gearScore: 2 } },
    { id: 'steady', name: '안정적인 연주', kind: 'positive', desc: '공연 점수 +3', effects: { showScore: 3 } },
    { id: 'creative', name: '작곡 감각', kind: 'positive', desc: '세트리스트 점수 +3', effects: { songScore: 3 } },
    { id: 'healer', name: '빠른 회복', kind: 'positive', desc: '휴식 회복량 +7', effects: { rest: 7 } },
    { id: 'mediator', name: '친화력', kind: 'positive', desc: '참여 사건 관계 변화 +2', effects: { social: 2 } },
    { id: 'focused', name: '집중력', kind: 'positive', desc: '체력 60% 이상일 때 공연 +3', effects: { fitScore: 3 } },
    { id: 'agent', name: '협상가', kind: 'positive', desc: '공연 수입 +10%', effects: { payRate: .1 } },
    { id: 'mentor', name: '성장 촉진', kind: 'positive', desc: '공연 경험치 +2', effects: { showExp: 2 } },
    { id: 'optimist', name: '낙천가', kind: 'positive', desc: '부정 사건의 관계 손실 완화 +2', effects: { negativeSocial: 2 } },
    { id: 'challenger', name: '도전 정신', kind: 'positive', desc: '난이도 55+ 공연 점수 +4', effects: { hardShowScore: 4 } },
    { id: 'composer', name: '작곡왕', kind: 'positive', desc: '새로 나오는 곡의 점수 +1', effects: { newSongBoost: 1 } },
    { id: 'stagefright', name: '무대 공포', kind: 'negative', desc: '무대 매력 -10', effects: { startCharm: -10 } },
    { id: 'fragile', name: '약한 체력', kind: 'negative', desc: '최대 체력 -15', effects: { maxEnergy: -15 } },
    { id: 'slacker', name: '연습 기피', kind: 'negative', desc: '개인 연습 성장 -2', effects: { practice: -2 } },
    { id: 'troublemaker', name: '갈등 유발', kind: 'negative', desc: '참여 사건 관계 변화 -2', effects: { social: -2 } },
    { id: 'spendthrift', name: '과소비', kind: 'negative', desc: '장비 가격 +35원', effects: { gearCost: 35 } },
    { id: 'publicityshy', name: '홍보 울렁증', kind: 'negative', desc: '홍보 기대감 -6', effects: { promo: -6 } },
    { id: 'offbeat', name: '박자 불안', kind: 'negative', desc: '공연 점수 -4', effects: { showScore: -4 } },
    { id: 'aloof', name: '팬 응대 부족', kind: 'negative', desc: '공연 팬 증가 -15%', effects: { fanRate: -.15 } },
    { id: 'careless', name: '장비 부주의', kind: 'negative', desc: '장비 보유 시 공연 -2', effects: { gearScore: -2 } },
    { id: 'moody', name: '기복이 심함', kind: 'negative', desc: '관계 평균 60 미만 공연 -3', effects: { lowRelationScore: -3 } },
    { id: 'slowrest', name: '느린 회복', kind: 'negative', desc: '휴식 회복량 -7', effects: { rest: -7 } },
    { id: 'quarrelsome', name: '말다툼 잦음', kind: 'negative', desc: '부정 사건 관계 손실 -2', effects: { negativeSocial: -2 } },
    { id: 'tardy', name: '지각쟁이', kind: 'negative', desc: '합주 팀 호흡 -2', effects: { ensemble: -2 } },
    { id: 'unfocused', name: '집중력 부족', kind: 'negative', desc: '체력 50% 미만 공연 -3', effects: { tiredScore: -3 } },
    { id: 'badcontract', name: '계약 실수', kind: 'negative', desc: '공연 수입 -10%', effects: { payRate: -.1 } },
    { id: 'stagnant', name: '성장 정체', kind: 'negative', desc: '공연 경험치 -1', effects: { showExp: -1 } },
    { id: 'cynic', name: '비관주의', kind: 'negative', desc: '긍정 사건 관계 상승 -2', effects: { positiveSocial: -2 } },
    { id: 'reckless', name: '무리한 연주', kind: 'negative', desc: '난이도 55+ 공연 점수 -4', effects: { hardShowScore: -4 } },
    { id: 'writersblock', name: '작곡 막힘', kind: 'negative', desc: '세트리스트 점수 -3', effects: { songScore: -3 } },
    { id: 'egoist', name: '독단적 성향', kind: 'negative', desc: '팀 호흡 60 미만 공연 -3', effects: { lowSyncScore: -3 } }
  ];
  const maleNames = [
    '지호', '도윤', '시우', '태오', '준서', '하준', '도현', '민준', '건우', '태윤',
    '지후', '세준', '민재', '예찬', '현우', '지훈', '정우', '승현', '성민', '준혁'
  ];
  const femaleNames = [
    '하린', '예린', '나윤', '소율', '다은', '채원', '수아', '유나', '세아', '예서',
    '아린', '서아', '나은', '하나', '다현', '유하', '채윤', '태린', '로아', '은서'
  ];
  const neutralNames = [
    '유진', '수빈', '재희', '연우', '지민', '시현', '지율', '유빈', '수현', '서진',
    '지우', '이든', '선율', '하늘', '한결', '다온', '해솔', '가온', '온유', '하람'
  ];
  const femaleOnlyNames = new Set([...femaleNames, '서윤', '민서', '지안', '하율', '윤서', '주하']);
  const maleOnlyNames = new Set(maleNames);
  const starterSongTemplates = [
    { id: 'spark', type: '오프닝', boost: 4, unlock: 0 },
    { id: 'night', type: '드라이브', boost: 5, unlock: 0 },
    { id: 'echo', type: '엔딩', boost: 4, unlock: 0 }
  ];
  const legacySongTemplates = [
    ...starterSongTemplates,
    { id: 'neon', type: '신곡', boost: 8, unlock: 15 },
    { id: 'storm', type: '신곡', boost: 10, unlock: 35 },
    { id: 'horizon', type: '대표곡', boost: 12, unlock: 65 }
  ];
  const legacySongNames = ['첫 불꽃', '밤의 속도', '우리의 메아리', '네온 거리', '폭풍 전야', '수평선 너머'];
  const songPrefixes = ['새벽의', '네온빛', '붉은', '느린', '푸른', '낯선', '유리빛', '끝없는', '작은', '먼', '검은', '찬란한', '희미한', '뜨거운', '조용한', '흐린', '빛나는', '마지막', '첫 번째', '우리의', '흩어진', '반짝이는', '깊은', '가벼운', '서툰', '투명한', '시끄러운', '하얀', '흔들리는', '포근한', '비밀스러운', '차가운', '끝내', '잊혀진', '돌아온', '낮은', '높은', '새로운', '오래된', '달콤한', '어지러운', '남겨진', '사라진', '눈부신', '잠들지 않는'];
  const songNouns = ['파도', '심장', '거리', '우주', '신호', '밤', '노래', '계절', '불꽃', '기억', '발걸음', '별', '숨결', '소음', '빛', '비밀', '약속', '궤도', '시간', '여름', '멜로디', '그림자', '도시', '아침', '정거장', '편지', '바람', '눈물', '하늘', '달', '비', '꿈', '새', '창문', '리듬', '기차', '섬', '노을', '전파', '온도', '악보', '꽃', '물결', '새벽', '미소', '침묵', '골목', '안개', '장면', '목소리'];
  const venues = [
    { name: '골목 라이브 바', audience: 65, pay: 100, difficulty: 35 },
    { name: '독립서점 오픈 마이크', audience: 78, pay: 115, difficulty: 37 },
    { name: '대학가 클럽', audience: 100, pay: 140, difficulty: 40 },
    { name: '옥상 라이브', audience: 125, pay: 165, difficulty: 43 },
    { name: '문화센터 소극장', audience: 150, pay: 190, difficulty: 46 },
    { name: '재즈 카페 세션', audience: 175, pay: 220, difficulty: 49 },
    { name: '지하 음악 축제', audience: 205, pay: 255, difficulty: 52 },
    { name: '해변 버스킹 무대', audience: 245, pay: 290, difficulty: 54 },
    { name: '도심 라이브 하우스', audience: 290, pay: 330, difficulty: 57 },
    { name: '라디오 공개방송', audience: 330, pay: 380, difficulty: 60 },
    { name: '시티 스테이지', audience: 380, pay: 435, difficulty: 63 },
    { name: '대학 축제 메인 무대', audience: 440, pay: 495, difficulty: 65 },
    { name: '야외 록 페스티벌', audience: 510, pay: 560, difficulty: 68 },
    { name: '서머 뮤직 페스티벌', audience: 590, pay: 630, difficulty: 70 },
    { name: '전국 투어 홀', audience: 680, pay: 710, difficulty: 73 },
    { name: '아레나 스페셜 쇼', audience: 800, pay: 800, difficulty: 76 }
  ];

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffle = list => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = randomInt(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const format = value => Number(value).toLocaleString('ko-KR');
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const traitOf = id => traits.find(trait => trait.id === id);
  const traitIdsOf = member => member.traits || (member.trait ? [member.trait] : []);
  const traitEffectSum = (ids, key) => ids.reduce((sum, id) => sum + (traitOf(id)?.effects[key] || 0), 0);
  const memberEffect = (member, key) => traitEffectSum(traitIdsOf(member), key);
  const bandEffect = key => state.members.reduce((sum, member) => sum + memberEffect(member, key), 0);
  const pairKey = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;
  const particle = (word, withFinal, withoutFinal) => {
    const code = word.charCodeAt(word.length - 1);
    return code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 ? withFinal : withoutFinal;
  };
  const pairNames = (a, b) => {
    const first = state.members[a].name;
    return `${first}${particle(first, '과', '와')} ${state.members[b].name}`;
  };
  let usedTitles = readTitleHistory();
  let state = load();
  let draft = { name: '', members: createRoster(), rolls: 1 };
  let toastTimer;

  function createRoster() {
    const pickedTraits = shuffle(traits).slice(0, 15);
    const usedNames = new Set();
    const malePortraits = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
    const femalePortraits = shuffle([8, 9, 10, 11, 12, 13, 14, 15]);
    return positions.map((position, index) => {
      const memberTraits = pickedTraits.slice(index * 3, index * 3 + 3).map(trait => trait.id);
      const gender = randomInt(0, 1) ? '여성' : '남성';
      const namePool = randomInt(0, 3) === 0 ? neutralNames : gender === '여성' ? femaleNames : maleNames;
      const name = shuffle(namePool).find(candidate => !usedNames.has(candidate));
      usedNames.add(name);
      const skill = clamp(randomInt(47, 68) + traitEffectSum(memberTraits, 'startSkill'), 20, 100);
      const charm = clamp(randomInt(43, 66) + traitEffectSum(memberTraits, 'startCharm'), 20, 100);
      const maxEnergy = clamp(100 + traitEffectSum(memberTraits, 'maxEnergy'), 60, 130);
      return {
        name, role: position.role, gender,
        portraitIndex: gender === '여성' ? femalePortraits.pop() : malePortraits.pop(), traits: memberTraits,
        skill, charm, maxEnergy, energy: maxEnergy - randomInt(5, 14), exp: 0
      };
    });
  }

  function normalizeRosterNames(members) {
    const used = new Set(members.map(member => member.name));
    let changed = false;
    members.forEach(member => {
      const mismatched = member.gender === '남성' ? femaleOnlyNames.has(member.name) :
        member.gender === '여성' && maleOnlyNames.has(member.name);
      if (!mismatched) return;
      const pool = member.gender === '남성' ? maleNames : femaleNames;
      const replacement = shuffle(pool).find(name => !used.has(name));
      if (!replacement) return;
      member.name = replacement;
      used.add(replacement);
      changed = true;
    });
    return changed;
  }

  function readTitleHistory() {
    try {
      const list = JSON.parse(localStorage.getItem(TITLE_HISTORY_KEY));
      return Array.isArray(list) ? list.filter(value => typeof value === 'string') : [];
    } catch (_) { return []; }
  }

  function takeSongTitles(count) {
    const all = songPrefixes.flatMap(prefix => songNouns.map(noun => `${prefix} ${noun}`));
    const used = new Set(usedTitles);
    let edition = 0;
    let available = [];
    while (available.length < count) {
      const suffix = edition ? ` · ${edition + 1}막` : '';
      available = all.map(title => title + suffix).filter(title => !used.has(title));
      edition += 1;
    }
    const namesForBand = shuffle(available).slice(0, count);
    usedTitles.push(...namesForBand);
    try { localStorage.setItem(TITLE_HISTORY_KEY, JSON.stringify(usedTitles)); } catch (_) { /* 저장 사용 불가 */ }
    return namesForBand;
  }

  function createSongCatalog() {
    const namesForBand = takeSongTitles(3);
    return starterSongTemplates.map((song, index) => ({ ...song, name: namesForBand[index] }));
  }

  function bandScale() {
    return state.fame + Math.sqrt(state.fans);
  }

  function addUnlockedSongs() {
    const targetCount = 3 + Math.floor(bandScale() / 20);
    const newTitles = [];
    while (state.songs.length < targetCount) {
      const index = state.songs.length;
      const name = takeSongTitles(1)[0];
      state.songs.push({ id: `song-${index}`, name, type: index % 5 === 4 ? '대표곡' : '신곡',
        boost: clamp(6 + Math.floor(index / 3) + bandEffect('newSongBoost'), 4, 16), unlock: 0 });
      newTitles.push(name);
      log(`새 노래 「${name}」가 완성됐습니다!`);
    }
    return newTitles;
  }

  function createRelationships() {
    const values = {};
    for (let a = 0; a < 5; a += 1) {
      for (let b = a + 1; b < 5; b += 1) values[pairKey(a, b)] = randomInt(52, 72);
    }
    return values;
  }

  function relationshipEntries() {
    return Object.entries(state.relationships).map(([key, value]) => {
      const [a, b] = key.split('-').map(Number);
      return { key, a, b, value };
    });
  }

  function relationAverage() {
    const values = Object.values(state.relationships);
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }

  function weakestPair() {
    return relationshipEntries().sort((a, b) => a.value - b.value)[0];
  }

  function load() {
    try {
      const current = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (current && current.version === 4 && Array.isArray(current.members) && current.members.length === 5 && Array.isArray(current.songs) && Number.isInteger(current.week)) {
        if (normalizeRosterNames(current.members)) {
          try { localStorage.setItem(SAVE_KEY, JSON.stringify(current)); } catch (_) { /* 저장 공간이 부족해도 이어하기 유지 */ }
        }
        return current;
      }
      const oldKey = [PREVIOUS_SAVE_KEY, OLDER_SAVE_KEY, OLD_SAVE_KEY].find(key => localStorage.getItem(key));
      if (!oldKey) return null;
      const previous = JSON.parse(localStorage.getItem(oldKey));
      if (!previous || !Array.isArray(previous.members) || previous.members.length !== 5 || !Number.isInteger(previous.week)) return null;
      const male = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
      const female = shuffle([8, 9, 10, 11, 12, 13, 14, 15]);
      const alreadyHeld = new Set(previous.members.flatMap(member => traitIdsOf(member)));
      const spareTraits = shuffle(traits.filter(trait => !alreadyHeld.has(trait.id))).map(trait => trait.id);
      previous.members.forEach(member => {
        member.gender ||= randomInt(0, 1) ? '여성' : '남성';
        if (!Number.isInteger(member.portraitIndex)) member.portraitIndex = member.gender === '여성' ? female.pop() : male.pop();
        const existing = traitIdsOf(member);
        const added = spareTraits.splice(0, Math.max(0, 3 - existing.length));
        member.traits = [...existing, ...added].slice(0, 3);
        delete member.trait;
        member.skill = clamp(member.skill + traitEffectSum(added, 'startSkill'), 20, 100);
        member.charm = clamp(member.charm + traitEffectSum(added, 'startCharm'), 20, 100);
        member.maxEnergy = clamp(member.maxEnergy + traitEffectSum(added, 'maxEnergy'), 60, 130);
        member.energy = clamp(member.energy + traitEffectSum(added, 'maxEnergy'), 0, member.maxEnergy);
      });
      normalizeRosterNames(previous.members);
      previous.relationships ||= createRelationships();
      previous.strainWeeks ||= 0;
      if (previous.lastEvent && !Array.isArray(previous.lastEvent.participants)) previous.lastEvent = null;
      previous.songs ||= legacySongTemplates.map((song, index) => ({ ...song, name: legacySongNames[index] }));
      previous.version = 4;
      if (previous.phase === 'ending') {
        previous.phase = 'post';
        previous.result = { skipped: true, venue: previous.offer?.name || '지난 공연' };
      }
      localStorage.setItem(SAVE_KEY, JSON.stringify(previous));
      localStorage.removeItem(oldKey);
      return previous;
    } catch (_) { /* 저장을 사용할 수 없는 환경에서도 플레이 가능 */ }
    return null;
  }

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
    catch (_) { notify('이 브라우저에서 자동 저장을 사용할 수 없습니다.'); }
  }

  function notify(message) {
    document.querySelector('.toast')?.remove();
    clearTimeout(toastTimer);
    const node = document.createElement('div');
    node.className = 'toast';
    node.setAttribute('role', 'status');
    node.textContent = message;
    document.body.append(node);
    toastTimer = setTimeout(() => node.remove(), 3300);
  }

  function offerFor(week, fame) {
    const level = clamp(Math.floor((week - 1) / 3) + Math.floor(fame / 35), 0, venues.length - 1);
    const base = venues[randomInt(Math.max(0, level - 1), level)];
    const lateTours = Math.floor(Math.max(0, week - 12) / 4);
    return { ...base, audience: base.audience + lateTours * 65 + randomInt(-8, 12),
      pay: base.pay + lateTours * 45 + randomInt(-10, 20), difficulty: clamp(base.difficulty + lateTours, 0, 80) };
  }

  function operatingCostFor(week, fame, fans, gear) {
    return 55 + Math.floor((week - 1) / 4) * 14 + Math.floor(fame / 20) * 12 +
      Math.floor(Math.sqrt(Math.max(0, fans))) * 3 + gear * 12;
  }

  function maxSetlistSize(offer) {
    return clamp(3 + Math.floor(Math.max(0, offer.audience - 100) / 150), 3, 8);
  }

  function startGame() {
    const name = draft.name.trim().slice(0, 24) || '우리의 밴드';
    state = {
      version: 4, phase: 'prep', name, week: 1, ap: 3,
      money: 250, fans: 20, fame: 0, synergy: 45, hype: 0, gear: 0,
      members: draft.members.map(member => ({ ...member })),
      songs: createSongCatalog(),
      relationships: createRelationships(), strainWeeks: 0, lastEvent: null, gameOverReason: '', lastOperatingCost: 0,
      setlist: ['spark', 'night', 'echo'], offer: offerFor(1, 0),
      totalEarned: 0, shows: 0, wins: 0, result: null,
      log: [{ week: 1, text: '첫 연습실에 모였습니다. 이제 우리만의 사운드를 만들 차례!' }]
    };
    applyEvent();
    save(); render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function log(text) {
    state.log.unshift({ week: state.week, text });
    state.log = state.log.slice(0, 14);
  }

  function actionCost(kind) {
    if (kind === 'ensemble') return 50;
    if (kind === 'practice') return 30;
    if (kind === 'promo') return 45;
    if (kind === 'gear') return clamp(180 + bandEffect('gearCost'), 90, 260);
    if (kind === 'talk') return 40;
    return 0;
  }

  function runAction(kind) {
    if (!state || state.phase !== 'prep') return;
    if (state.ap < 1) return notify('이번 주 행동 포인트를 모두 사용했습니다.');
    if (kind === 'gear' && state.gear >= 3) return notify('장비는 3단계가 최대입니다.');
    const cost = actionCost(kind);
    if (state.money < cost) return notify('자금이 부족합니다.');
    let message = '';
    if (kind === 'ensemble') {
      const gain = Math.max(1, 8 + bandEffect('ensemble'));
      state.synergy = clamp(state.synergy + gain, 0, 100);
      state.members.forEach(member => member.energy = clamp(member.energy - 8, 0, member.maxEnergy));
      message = `합주 완료! 팀 호흡 +${gain}, 전원 체력 -8`;
    } else if (kind === 'practice') {
      const index = Number(document.querySelector('#train-member')?.value);
      const member = state.members[index];
      if (!member) return;
      const gain = Math.max(1, 3 + memberEffect(member, 'practice'));
      member.skill = clamp(member.skill + gain, 0, 100);
      member.energy = clamp(member.energy - 10, 0, member.maxEnergy);
      member.exp += 3;
      message = `${member.name} 개인 연습! 연주력 +${gain}, 체력 -10`;
    } else if (kind === 'promo') {
      const gain = Math.max(2, 14 + bandEffect('promo'));
      state.hype = clamp(state.hype + gain, 0, 100);
      state.fans += 2;
      message = `홍보 완료! 공연 기대감 +${gain}, 팬 +2`;
    } else if (kind === 'rest') {
      state.members.forEach(member => member.energy = clamp(member.energy + Math.max(5, 20 + memberEffect(member, 'rest')), 0, member.maxEnergy));
      message = '충분히 쉬었습니다. 멤버 특성에 따라 체력을 회복했습니다.';
    } else if (kind === 'gear') {
      state.gear += 1;
      message = `장비를 업그레이드했습니다. 장비 ${state.gear}단계`;
    } else if (kind === 'talk') {
      const pair = weakestPair();
      state.relationships[pair.key] = clamp(pair.value + 14, 0, 100);
      state.synergy = clamp(state.synergy + 4, 0, 100);
      message = `${pairNames(pair.a, pair.b)} 함께 대화했습니다. 둘의 관계 +14, 팀 호흡 +4`;
    } else return;
    state.money -= cost;
    state.ap -= 1;
    addUnlockedSongs();
    log(message); save(); render(); notify(message);
  }

  function showCutscene() {
    const overlay = document.createElement('div');
    overlay.className = 'cutscene';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '밴드 공연 픽셀 애니메이션');
    overlay.innerHTML = `<div class="cutscene-card"><div class="cutscene-head"><strong>● LIVE NOW</strong><span>${escapeHtml(state.offer.name)}</span></div><canvas width="640" height="360" aria-label="다섯 멤버가 무대에서 공연하는 애니메이션"></canvas><div class="cutscene-foot"><span>${escapeHtml(state.name)} · ${state.members.map(member => member.role).join(' / ')}</span><button class="button button-small" type="button">건너뛰기 →</button></div></div>`;
    document.body.append(overlay);
    const canvas = overlay.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) { overlay.remove(); return; }
    const stage = new Image();
    stage.src = 'assets/stage-backdrop.png';
    const portraits = new Image();
    portraits.src = 'assets/portrait-atlas.png';
    const colors = ['#f79c9c', '#efb666', '#93b5ff', '#ca9aff', '#91dfc4'];
    let frameId = 0;
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      cancelAnimationFrame(frameId);
      document.removeEventListener('keydown', onKey);
      overlay.remove();
    };
    const onKey = event => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    overlay.querySelector('button').addEventListener('click', close);
    overlay.querySelector('button').focus();

    const drawMember = (member, index, tick) => {
      const x = 95 + index * 112;
      const bounce = Math.round(Math.sin(tick * .012 + index * 1.4) * 5);
      const y = 235 + bounce;
      ctx.fillStyle = '#11131f';
      ctx.fillRect(x - 15, y + 16, 12, 37);
      ctx.fillRect(x + 4, y + 16, 12, 37);
      ctx.fillStyle = colors[index];
      ctx.fillRect(x - 17, y - 14, 34, 34);
      ctx.fillStyle = '#242333';
      ctx.fillRect(x - 11, y - 11, 22, 27);
      const portraitIndex = Number.isInteger(member.portraitIndex) ? member.portraitIndex : 0;
      if (portraits.complete && portraits.naturalWidth) {
        ctx.drawImage(portraits, portraitIndex % 4 * portraits.width / 4,
          Math.floor(portraitIndex / 4) * portraits.height / 4,
          portraits.width / 4, portraits.height / 4, x - 20, y - 57, 40, 40);
      } else {
        ctx.fillStyle = '#f7c9a2';
        ctx.fillRect(x - 16, y - 53, 32, 32);
      }
      ctx.fillStyle = colors[index];
      ctx.fillRect(x - 22, y - 17, 8, 30);
      ctx.fillRect(x + 14, y - 17, 8, 30);
      if (index === 0) {
        ctx.fillStyle = '#d8f5fc'; ctx.fillRect(x + 24, y - 18, 4, 61); ctx.fillRect(x + 19, y - 21, 14, 7);
      } else if (index === 1 || index === 2) {
        ctx.fillStyle = index === 1 ? '#e9a769' : '#81a7d9';
        ctx.fillRect(x - 15, y - 1, 32, 16); ctx.fillRect(x + 14, y + 3, 27, 6);
        ctx.fillStyle = '#2a2434'; ctx.fillRect(x - 8, y + 5, 13, 4);
      } else if (index === 3) {
        ctx.fillStyle = '#d4b4ed'; ctx.fillRect(x - 24, y + 8, 48, 25);
        ctx.fillStyle = '#2b2636'; ctx.fillRect(x - 18, y + 12, 36, 17);
        ctx.fillStyle = '#f0daff'; ctx.fillRect(x - 32, y - 5, 17, 5); ctx.fillRect(x + 16, y - 5, 17, 5);
      } else {
        ctx.fillStyle = '#c5dedf'; ctx.fillRect(x - 31, y + 4, 62, 13);
        ctx.fillStyle = '#242b37'; ctx.fillRect(x - 29, y + 7, 58, 7);
        ctx.fillStyle = '#e3f9ef';
        for (let key = -27; key <= 22; key += 10) ctx.fillRect(x + key, y + 7, 6, 7);
      }
    };

    const draw = now => {
      if (closed) return;
      const tick = now;
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#171225'; ctx.fillRect(0, 0, 640, 360);
      if (stage.complete && stage.naturalWidth) ctx.drawImage(stage, 0, 0, 640, 360);
      else {
        ctx.fillStyle = '#302444'; ctx.fillRect(0, 0, 640, 300);
        ctx.fillStyle = '#473b59'; ctx.fillRect(0, 280, 640, 80);
        ctx.fillStyle = '#6d5073'; ctx.fillRect(0, 286, 640, 5);
      }
      for (let i = 0; i < 5; i += 1) {
        const x = 70 + i * 125 + Math.sin(tick * .0015 + i) * 22;
        ctx.fillStyle = i % 2 ? '#d6f75b24' : '#f79c9c24';
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 66, 300); ctx.lineTo(x + 66, 300); ctx.fill();
      }
      for (let i = 0; i < state.members.length; i += 1) drawMember(state.members[i], i, tick);
      ctx.fillStyle = '#10121b';
      for (let i = 0; i < 17; i += 1) {
        const x = i * 40 - 8;
        const bounce = Math.round(Math.sin(tick * .008 + i * .8) * 5);
        ctx.fillRect(x, 326 + bounce, 31, 34);
        ctx.fillRect(x + 5, 312 + bounce, 21, 21);
      }
      ctx.fillStyle = '#e9ffa8'; ctx.font = 'bold 13px monospace'; ctx.fillText('LIVE  //  ' + state.name.slice(0, 18), 18, 25);
      for (let i = 0; i < 8; i += 1) {
        const x = (i * 79 + tick * .04) % 640;
        const y = 60 + (i * 37 + tick * .07) % 205;
        ctx.fillStyle = i % 2 ? '#d6f75b' : '#f39aa7'; ctx.fillRect(Math.round(x), Math.round(y), 4, 4);
      }
      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);
    setTimeout(close, 4600);
  }

  function perform() {
    if (!state || state.phase !== 'prep') return;
    const chosen = state.setlist.map(id => state.songs.find(song => song.id === id)).filter(song => song && state.fame >= song.unlock);
    if (!chosen.length) return notify('공연할 곡을 1곡 이상 골라 주세요.');
    if (chosen.length > maxSetlistSize(state.offer)) return notify(`이번 무대에는 최대 ${maxSetlistSize(state.offer)}곡까지 공연할 수 있습니다.`);
    const average = key => state.members.reduce((sum, member) => sum + member[key], 0) / 5;
    const energyRatio = state.members.reduce((sum, member) => sum + member.energy / member.maxEnergy * 100, 0) / 5;
    const songBonus = chosen.reduce((sum, song) => sum + song.boost, 0) / chosen.length + Math.max(0, chosen.length - 3);
    const special = bandEffect('showScore') + bandEffect('songScore') +
      (state.gear > 0 ? bandEffect('gearScore') : 0) +
      (state.offer.difficulty >= 55 ? bandEffect('hardShowScore') : 0) +
      (relationAverage() < 60 ? bandEffect('lowRelationScore') : 0) +
      (state.synergy < 60 ? bandEffect('lowSyncScore') : 0) +
      state.members.reduce((sum, member) => sum +
        (member.energy / member.maxEnergy >= .6 ? memberEffect(member, 'fitScore') : 0) +
        (member.energy / member.maxEnergy < .5 ? memberEffect(member, 'tiredScore') : 0), 0);
    const score = clamp(Math.round(12 + average('skill') * .45 + average('charm') * .23 +
      energyRatio * .14 + state.synergy * .18 + state.gear * 4 + state.hype * .12 +
      songBonus + special + (relationAverage() - 60) * .22 - state.offer.difficulty * .32 + randomInt(-7, 7)), 0, 100);
    const grade = score >= 85 ? 'S' : score >= 72 ? 'A' : score >= 58 ? 'B' : score >= 43 ? 'C' : 'D';
    const success = score >= 58;
    const gross = Math.max(0, Math.round(state.offer.pay * (success ? 1 + Math.max(0, score - 60) / 100 : .55) * Math.max(.1, 1 + bandEffect('payRate'))));
    const venueFee = Math.round(gross * .18);
    const earned = gross - venueFee;
    const newFans = Math.max(2, Math.round(state.offer.audience * score / 100 * .36 * Math.max(.1, 1 + bandEffect('fanRate'))));
    const fame = Math.max(1, Math.floor(score / 17) + (success ? 2 : 0));
    state.money += earned;
    state.totalEarned += earned;
    state.fans += newFans;
    state.fame += fame;
    state.shows += 1;
    if (success) state.wins += 1;
    state.members.forEach(member => {
      member.energy = clamp(member.energy - 13, 0, member.maxEnergy);
      member.exp += Math.max(1, 2 + memberEffect(member, 'showExp'));
      if (member.exp >= 10) { member.skill = clamp(member.skill + 1, 0, 100); member.exp -= 10; }
    });
    const newSongs = addUnlockedSongs();
    state.result = { score, grade, success, gross, venueFee, earned, newFans, fame, songs: chosen.map(song => song.name), newSongs, venue: state.offer.name };
    state.phase = 'post';
    log(`${state.offer.name} 공연 ${grade}등급 · 공연장 수수료 ${format(venueFee)}원 · 정산 수입 ${format(earned)}원 · 팬 +${format(newFans)}`);
    save(); render(); showCutscene();
  }

  function skipShow() {
    if (!state || state.phase !== 'prep') return;
    if (!window.confirm('이번 주 공연을 건너뛸까요? 다음 주로 진행할 수 있습니다.')) return;
    state.result = { skipped: true, venue: state.offer.name };
    state.phase = 'post';
    log(`${state.offer.name} 공연을 쉬었습니다.`);
    save(); render();
  }

  function applyEvent() {
    const count = randomInt(1, 5);
    const all = [0, 1, 2, 3, 4];
    const weakest = weakestPair();
    const name = index => state.members[index].name;
    const before = { money: state.money, fans: state.fans, hype: state.hype, synergy: state.synergy };
    let participants = [];
    let title = '';
    let text = '';
    let relationPerPair = 0;
    const energyNotes = [];
    const skillNotes = [];

    if (count === 1) {
      const tired = all.reduce((low, index) => state.members[index].energy < state.members[low].energy ? index : low, 0);
      if (state.members[tired].energy < 70) {
        participants = [tired]; title = '혼자만의 휴식';
        const member = state.members[tired];
        const recovered = Math.min(24, member.maxEnergy - member.energy);
        member.energy += recovered;
        energyNotes.push(`${member.name} 체력 +${recovered}`);
        text = `${member.name}${particle(member.name, '이', '가')} 잠시 연습실을 떠나 쉬고 돌아왔습니다.`;
      } else {
        const index = all[randomInt(0, 4)];
        participants = [index]; title = '혼자 쓴 멜로디';
        state.members[index].skill = clamp(state.members[index].skill + 2, 0, 100);
        state.members[index].energy = clamp(state.members[index].energy - 7, 0, state.members[index].maxEnergy);
        skillNotes.push(`${name(index)} 연주력 +2`, `${name(index)} 체력 -7`);
        text = `${name(index)}${particle(name(index), '이', '가')} 혼자 새로운 멜로디를 만들었습니다.`;
      }
    } else if (count === 2) {
      const pair = weakest.value < 58 ? weakest : relationshipEntries()[randomInt(0, 9)];
      participants = [pair.a, pair.b];
      if (pair.value < 72 && Math.random() < clamp(.32 + (60 - pair.value) * .014, .2, .72)) {
        title = '멤버 간 불화'; relationPerPair = -randomInt(18, 28);
        state.synergy = clamp(state.synergy - 5, 0, 100);
        text = `${pairNames(pair.a, pair.b)} 연습 방향을 두고 크게 다퉜습니다.`;
      } else if (pair.value < 65) {
        title = '둘만의 화해'; relationPerPair = randomInt(6, 10);
        state.synergy = clamp(state.synergy + 3, 0, 100);
        text = `${pairNames(pair.a, pair.b)} 솔직한 대화로 서로를 이해했습니다.`;
      } else {
        title = '즉흥 듀엣'; relationPerPair = randomInt(3, 7);
        state.hype = clamp(state.hype + 4, 0, 100);
        text = `${pairNames(pair.a, pair.b)} 즉흥 연주를 맞추며 좋은 호흡을 보여줬습니다.`;
      }
    } else if (count === 3) {
      const third = shuffle(all.filter(index => index !== weakest.a && index !== weakest.b))[0];
      participants = [weakest.a, weakest.b, third];
      const trioAverage = (state.relationships[pairKey(participants[0], participants[1])] +
        state.relationships[pairKey(participants[0], participants[2])] +
        state.relationships[pairKey(participants[1], participants[2])]) / 3;
      if (trioAverage < 68 && Math.random() < clamp(.30 + (60 - trioAverage) * .015, .2, .7)) {
        title = '세 사람의 편곡 논쟁'; relationPerPair = -randomInt(9, 15);
        state.synergy = clamp(state.synergy - 5, 0, 100);
        text = `${participants.map(name).join('·')}의 의견이 엇갈려 편곡 회의가 길어졌습니다.`;
      } else {
        title = '세 사람의 잼 세션'; relationPerPair = randomInt(3, 7);
        state.synergy = clamp(state.synergy + 4, 0, 100);
        participants.forEach(index => state.members[index].energy = clamp(state.members[index].energy - 5, 0, state.members[index].maxEnergy));
        energyNotes.push('참여 멤버 체력 -5');
        text = '세 멤버가 함께 잼 세션을 열었습니다.';
      }
    } else if (count === 4) {
      participants = shuffle(all).slice(0, 4);
      if ((state.synergy < 70 || relationAverage() < 65) && Math.random() < .36) {
        title = '네 명의 합주 충돌'; relationPerPair = -randomInt(6, 10);
        state.synergy = clamp(state.synergy - 6, 0, 100);
        text = '네 멤버가 합주 중 서로의 실수를 탓하며 다퉜습니다.';
      } else if (state.synergy < 65) {
        title = '네 명의 집중 합주'; relationPerPair = randomInt(2, 5);
        state.synergy = clamp(state.synergy + 7, 0, 100);
        text = '네 멤버가 무대 호흡을 다시 맞췄습니다.';
      } else {
        title = '깜짝 거리 공연'; relationPerPair = randomInt(2, 4);
        state.fans += 14;
        text = '네 멤버가 거리에서 작은 공연을 열었습니다.';
      }
      participants.forEach(index => state.members[index].energy = clamp(state.members[index].energy - 6, 0, state.members[index].maxEnergy));
      energyNotes.push('참여 멤버 체력 -6');
    } else {
      participants = all;
      if (relationAverage() < 75 && Math.random() < clamp(.3 + (60 - relationAverage()) * .015, .2, .65)) {
        title = '전체 회의 충돌'; relationPerPair = -randomInt(6, 10);
        state.synergy = clamp(state.synergy - 7, 0, 100);
        text = '다섯 멤버의 회의가 감정싸움으로 번졌습니다.';
      } else if (state.money >= 45 && relationAverage() < 80) {
        title = '밴드 회식'; relationPerPair = randomInt(3, 5);
        state.money -= 45;
        state.synergy = clamp(state.synergy + 4, 0, 100);
        text = '다섯 멤버가 함께 회식하며 서로의 이야기를 들었습니다.';
      } else {
        title = '전원 단체 사진'; relationPerPair = randomInt(1, 3);
        state.fans += 10;
        state.hype = clamp(state.hype + 5, 0, 100);
        text = '다섯 멤버가 찍은 단체 사진이 팬들 사이에 퍼졌습니다.';
      }
    }

    let affectedPairs = 0;
    let relationChange = 0;
    if (relationPerPair) {
      for (let i = 0; i < participants.length; i += 1) {
        for (let j = i + 1; j < participants.length; j += 1) {
          const key = pairKey(participants[i], participants[j]);
          const first = state.members[participants[i]];
          const second = state.members[participants[j]];
          let delta = relationPerPair + memberEffect(first, 'social') + memberEffect(second, 'social');
          delta += relationPerPair < 0
            ? memberEffect(first, 'negativeSocial') + memberEffect(second, 'negativeSocial')
            : memberEffect(first, 'positiveSocial') + memberEffect(second, 'positiveSocial');
          delta = relationPerPair < 0 ? Math.min(-1, delta) : Math.max(1, delta);
          const beforeRelation = state.relationships[key];
          state.relationships[key] = clamp(beforeRelation + delta, 0, 100);
          relationChange += state.relationships[key] - beforeRelation;
          affectedPairs += 1;
        }
      }
    }
    const extras = [];
    if (affectedPairs) extras.push(`관계 합계 ${relationChange > 0 ? '+' : ''}${relationChange} · ${affectedPairs}쌍`);
    for (const [key, label] of [['money', '자금'], ['fans', '팬'], ['hype', '기대감'], ['synergy', '팀 호흡']]) {
      const change = state[key] - before[key];
      if (change) extras.push(`${label} ${change > 0 ? '+' : ''}${change}`);
    }
    extras.push(...energyNotes, ...skillNotes);
    state.lastEvent = { title, text, participants: participants.map(name), count, relationPerPair,
      affectedPairs, negative: relationPerPair < 0, extra: extras.join(' · ') };
    log(`${count}인 이벤트 · ${title}: ${text} ${extras.join(' · ')}`);
  }

  function checkGameOver() {
    const weakest = weakestPair();
    const average = relationAverage();
    state.strainWeeks = state.money < 30 ? state.strainWeeks + 1 : 0;
    if (state.strainWeeks >= 3) {
      state.gameOverReason = '자금난이 3주 동안 이어져 멤버들이 활동을 중단했습니다.';
    } else if (weakest.value <= 5 || average < 20 ||
      (weakest.value <= 22 && Math.random() < .2 + (22 - weakest.value) * .025)) {
      state.gameOverReason = `${pairNames(weakest.a, weakest.b)}의 갈등을 넘지 못해 밴드가 갑자기 해체됐습니다.`;
    }
    if (state.gameOverReason) {
      state.phase = 'gameover';
      log(state.gameOverReason);
    }
  }

  function nextWeek() {
    if (!state || state.phase !== 'post') return;
    state.week += 1;
    state.ap = 3;
    state.hype = Math.floor(state.hype / 2);
    state.members.forEach(member => member.energy = clamp(member.energy + 8, 0, member.maxEnergy));
    state.lastOperatingCost = operatingCostFor(state.week, state.fame, state.fans, state.gear);
    state.money -= state.lastOperatingCost;
    log(`연습실 임대·이동·장비 유지 등 ${state.week}주차 운영비 -${format(state.lastOperatingCost)}원`);
    state.result = null;
    state.phase = 'prep';
    applyEvent();
    addUnlockedSongs();
    state.offer = offerFor(state.week, state.fame);
    const previousSongCount = state.setlist.length;
    state.setlist = state.setlist.filter(id => state.songs.some(song => song.id === id && song.unlock <= state.fame)).slice(0, maxSetlistSize(state.offer));
    if (state.setlist.length < previousSongCount) log(`이번 무대 규모에 맞춰 세트리스트를 ${state.setlist.length}곡으로 조정했습니다.`);
    checkGameOver();
    save(); render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetGame() {
    if (state && !window.confirm('현재 밴드를 지우고 새로 시작할까요? 저장된 진행 상황이 삭제됩니다.')) return;
    state = null;
    try { localStorage.removeItem(SAVE_KEY); localStorage.removeItem(PREVIOUS_SAVE_KEY); localStorage.removeItem(OLDER_SAVE_KEY); localStorage.removeItem(OLD_SAVE_KEY); } catch (_) { /* 저장 사용 불가 */ }
    draft = { name: '', members: createRoster(), rolls: 1 };
    render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function metric(label, value, unit = '') {
    return `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value">${value}${unit ? `<small>${unit}</small>` : ''}</div></div>`;
  }

  function portraitStyle(member) {
    const index = Number.isInteger(member.portraitIndex) ? member.portraitIndex : 0;
    return `--portrait-x:${index % 4 * 100 / 3}%;--portrait-y:${Math.floor(index / 4) * 100 / 3}%`;
  }

  function memberCard(member, index) {
    const position = positions[index];
    const memberTraits = traitIdsOf(member).map(traitOf).filter(Boolean);
    return `<article class="member-card" style="--accent:${position.color}">
      <div class="member-top"><span>${position.role.toUpperCase()}</span><span class="member-number">0${index + 1}</span></div>
      <div class="member-portrait" style="${portraitStyle(member)}" role="img" aria-label="${escapeHtml(member.name)} 픽셀 초상화"><span>${position.icon}</span></div>
      <h3>${escapeHtml(member.name)}</h3><p class="member-role">${position.role} · ${member.gender}</p>
      <div class="trait-list">${memberTraits.map(trait => `<span class="trait ${trait.kind === 'negative' ? 'trait-negative' : ''}">${trait.kind === 'negative' ? '▼' : '✦'} ${trait.name}</span>`).join('')}</div>
      <div class="trait-detail-list">${memberTraits.map(trait => `<p class="trait-desc">${trait.desc}</p>`).join('')}</div>
      <div class="stat-line"><span>연주력</span><strong>${member.skill}</strong></div><div class="meter"><span style="width:${member.skill}%"></span></div>
      <div class="stat-line"><span>무대 매력</span><strong>${member.charm}</strong></div><div class="meter"><span style="width:${member.charm}%"></span></div>
      <div class="stat-line"><span>체력</span><strong>${member.energy}/${member.maxEnergy}</strong></div><div class="meter"><span style="width:${Math.round(member.energy / member.maxEnergy * 100)}%"></span></div>
    </article>`;
  }

  function renderSetup() {
    app.innerHTML = `<section class="hero"><div><div class="eyebrow">YOUR STORY STARTS HERE</div><h1>MAKE<br>YOUR <em>BAND.</em></h1><p>무대에 오를 다섯 명을 고르세요. 후보마다 긍정·부정 특성 중 3개가 무작위로 붙습니다. 세 개가 모두 같은 종류일 수도 있어요. 마음에 드는 조합이 나올 때까지 제한 없이 다시 뽑을 수 있습니다.</p></div><div class="hero-aside"><strong>THE FIRST STEP / 01</strong>보컬 · 기타 · 베이스 · 드럼 · 키보드<br>총 5명이 하나의 사운드를 만듭니다.<br>언제까지 이어질지 모르는 밴드의 여정을 시작하세요.</div></section>
      <div class="setup-bar panel"><div><label class="field-label" for="band-name">BAND NAME / 밴드 이름</label><input id="band-name" class="name-input" maxlength="24" placeholder="우리의 밴드" value="${escapeHtml(draft.name)}"></div><div class="setup-count">현재 후보 조합 <strong>#${format(draft.rolls)}</strong></div></div>
      <div class="section-head"><div><span class="section-index">01 / LINEUP</span><h2>이번에 모인 멤버</h2></div><p>한 조합 안에서 특성은 중복되지 않습니다.</p></div>
      <div class="roster-grid">${draft.members.map(memberCard).join('')}</div>
      <div class="setup-actions"><div class="setup-hint">다시 뽑으면 다섯 명의 이름, 능력치, 특성이 모두 바뀝니다.<br>밴드를 시작한 뒤에는 멤버 구성이 고정됩니다.</div><div class="button-row"><button class="button" data-action="reroll">↻ 멤버 다시 뽑기</button><button class="button button-primary" data-action="start">이 멤버로 시작 →</button></div></div>
      <div class="help"><strong>게임 방법</strong> · 매주 행동 포인트 3개로 연습, 홍보, 휴식, 장비 구입, 팀 대화를 선택하세요. 매주 1~5명이 참여하는 사건이 생기고, 다음 주에는 밴드 규모에 따른 운영비가 빠집니다. 관계가 악화되거나 자금난이 이어지면 밴드가 해체될 수 있습니다. 팬과 명성이 커지면 신곡도 계속 추가됩니다. 진행 상황은 자동 저장됩니다.</div>`;
  }

  function actionCard(title, description, cost, action, disabled = false, extra = '') {
    return `<div class="action-card"><h3>${title}</h3><p>${description}</p>${extra}<div class="action-foot"><span class="cost">AP 1 · ${cost ? `${format(cost)}원` : '무료'}</span><button class="button button-small" data-action="${action}" ${disabled ? 'disabled' : ''}>실행 →</button></div></div>`;
  }

  function renderRelations() {
    const entries = relationshipEntries().sort((a, b) => a.value - b.value);
    return `<section class="panel section-panel"><div class="panel-head"><h2>멤버 간 감정</h2><span>평균 관계 ${relationAverage()} / 100</span></div>
      <div class="relationship-grid">${entries.map(pair => `<div class="relationship-row ${pair.value <= 35 ? 'relationship-low' : ''}"><div class="relationship-label"><strong>${escapeHtml(state.members[pair.a].name)} ↔ ${escapeHtml(state.members[pair.b].name)}</strong><span>${pair.value} / 100</span></div><div class="meter"><span style="width:${pair.value}%"></span></div></div>`).join('')}</div>
      <p class="muted">관계 평균은 공연 점수에 반영됩니다. 관계가 22 이하로 떨어진 두 멤버는 주차가 바뀔 때 해체 위험을 만들어요. 팀 대화는 가장 나쁜 관계를 회복합니다.</p></section>`;
  }

  function renderGame() {
    const preparing = state.phase === 'prep';
    const disabled = !preparing || state.ap < 1;
    const availableSongs = state.songs.filter(song => state.fame >= song.unlock);
    const nextSong = state.songs.find(song => state.fame < song.unlock);
    const songProgress = `신곡 ${Math.max(0, state.songs.length - 3)}곡 · 다음 성장 기준 ${Math.max(0, Math.ceil((state.songs.length - 2) * 20 - bandScale()))} 남음`;
    const nextOperatingCost = operatingCostFor(state.week + 1, state.fame, state.fans, state.gear);
    const result = state.result;
    app.innerHTML = `<div class="game-heading"><div><div class="eyebrow">WEEK ${String(state.week).padStart(2, '0')} · ${preparing ? '공연 준비 중' : '이번 주 종료'}</div><h1>${escapeHtml(state.name)}</h1></div><div class="game-heading-sub">우리의 사운드를 더 멀리 들려줄 시간.<br>진행 상황은 자동으로 저장됩니다.</div></div>
      <div class="dashboard">${metric('WEEK / 주차', state.week)}${metric('MONEY / 자금', format(state.money), '원')}${metric('FANS / 팬', format(state.fans), '명')}${metric('FAME / 명성', format(state.fame))}${metric('RELATION / 관계', relationAverage())}${metric('ACTION / 행동', `${state.ap} / 3`)}</div>
      <div class="game-layout"><div>
        ${state.lastEvent ? `<section class="event-panel ${state.lastEvent.negative ? 'event-negative' : 'event-positive'}"><div class="event-meta">이번 주 ${state.lastEvent.count}인 이벤트 · ${state.lastEvent.negative ? '갈등' : '밴드 이야기'}</div><h2>${escapeHtml(state.lastEvent.title)}</h2><p>${escapeHtml(state.lastEvent.text)}</p><div class="event-participants">${state.lastEvent.participants.map(person => `<span>${escapeHtml(person)}</span>`).join('')}</div><strong>${escapeHtml(state.lastEvent.extra || '밴드에 작은 변화가 생겼습니다.')}</strong></section>` : ''}
        ${weakestPair().value <= 35 || state.strainWeeks > 0 || state.money < nextOperatingCost ? `<div class="risk-note">⚠ ${weakestPair().value <= 35 ? `${escapeHtml(pairNames(weakestPair().a, weakestPair().b))}의 관계가 ${weakestPair().value}입니다. 팀 대화로 갈등을 풀어주세요.` : ''} ${state.money < nextOperatingCost ? `현재 자금으로는 다음 주 예상 운영비 ${format(nextOperatingCost)}원을 낼 수 없습니다. 공연 수입을 확보하세요.` : ''} ${state.strainWeeks > 0 ? `자금난 ${state.strainWeeks}/3주.` : ''}</div>` : ''}
        <section class="panel section-panel"><div class="panel-head"><h2>이번 주 할 일</h2><span>TEAM SYNC ${state.synergy} · 기대감 ${state.hype}</span></div><div class="action-grid">
          ${actionCard('◈ 합주', `팀 호흡 +${Math.max(1, 8 + bandEffect('ensemble'))}, 전원 체력 -8.`, 50, 'ensemble', disabled || state.money < 50)}
          ${actionCard('◎ 개인 연습', '선택한 멤버의 연주력이 특성에 따라 오르고 체력은 10 줄어듭니다.', 30, 'practice', disabled || state.money < 30, `<select id="train-member" aria-label="연습할 멤버 선택">${state.members.map((m, i) => `<option value="${i}">${escapeHtml(m.name)} · ${m.role}</option>`).join('')}</select>`)}
          ${actionCard('✳ 홍보', `공연 기대감 +${Math.max(2, 14 + bandEffect('promo'))}, 팬 +2.`, 45, 'promo', disabled || state.money < 45)}
          ${actionCard('☾ 휴식', '모든 멤버의 체력 회복. 회복량은 특성에 따라 달라집니다.', 0, 'rest', disabled)}
          ${actionCard('▣ 장비 구입', '장비 점수 +4. 최대 3단계. 비용은 특성에 따라 달라집니다.', actionCost('gear'), 'gear', disabled || state.money < actionCost('gear') || state.gear >= 3)}
          ${actionCard('♡ 팀 대화', '관계가 가장 나쁜 두 멤버가 대화합니다. 관계 +14, 팀 호흡 +4.', actionCost('talk'), 'talk', disabled || state.money < actionCost('talk'))}
        </div></section>
        <section class="panel section-panel"><div class="panel-head"><h2>멤버 현황</h2><span>장비 ${state.gear} / 3단계</span></div><div class="compact-members">${state.members.map((member, index) => `<div class="compact-member" style="--accent:${positions[index].color}"><div class="compact-portrait" style="${portraitStyle(member)}" role="img" aria-label="${escapeHtml(member.name)} 픽셀 초상화"></div><strong>${escapeHtml(member.name)}</strong><small>${member.role} · ${member.gender}</small><small>연주력 ${member.skill}</small><div class="trait-list">${traitIdsOf(member).map(traitOf).filter(Boolean).map(trait => `<span class="trait ${trait.kind === 'negative' ? 'trait-negative' : ''}" title="${escapeHtml(trait.desc)}">${escapeHtml(trait.name)}</span>`).join('')}</div><small>체력 ${member.energy}/${member.maxEnergy}</small><div class="meter"><span style="width:${Math.round(member.energy / member.maxEnergy * 100)}%"></span></div></div>`).join('')}</div></section>
        ${renderRelations()}
        <section class="panel section-panel"><div class="panel-head"><h2>밴드 기록</h2><span>RECENT NOTES</span></div><ul class="log-list">${state.log.slice(0, 7).map(item => `<li><time>WEEK ${String(item.week).padStart(2, '0')}</time>${escapeHtml(item.text)}</li>`).join('')}</ul></section>
      </div><div>
        <section class="panel section-panel"><div class="panel-head"><h2>이번 주 공연</h2><span>LIVE OFFER</span></div><div class="venue"><span class="venue-kicker">WEEK ${String(state.week).padStart(2, '0')} · SHOW</span><h3>${escapeHtml(state.offer.name)}</h3><div class="venue-stats"><span>예상 관객 <strong>${format(state.offer.audience)}명</strong></span><span>기본 출연료 <strong>${format(state.offer.pay)}원</strong></span><span>난이도 <strong>${state.offer.difficulty}</strong></span><span>공연장 수수료 <strong>정산액의 18%</strong></span><span>다음 주 예상 운영비 <strong>${format(nextOperatingCost)}원</strong></span></div></div>
        ${preparing ? `<div class="panel-head"><h2>세트리스트</h2><span>${availableSongs.length}곡 보유 · 최대 ${maxSetlistSize(state.offer)}곡 선택</span></div><div class="setlist">${availableSongs.map(song => `<label class="song-option"><div><div class="song-name">${escapeHtml(song.name)}</div><div class="song-sub">${song.type}</div></div><div class="song-badge">점수 +${song.boost}</div><input type="checkbox" data-song="${song.id}" aria-label="${escapeHtml(song.name)} 선택" ${state.setlist.includes(song.id) ? 'checked' : ''}></label>`).join('')}</div><p class="muted">관객 규모에 따라 최대 3~8곡까지 선택할 수 있습니다. 4곡째부터는 곡마다 공연 점수 +1. ${nextSong ? `다음 곡: 명성 ${nextSong.unlock} 달성 시 「${escapeHtml(nextSong.name)}」 해금 · ` : ''}${songProgress} · 팬과 명성이 쌓이면 계속 추가됩니다.</p><div class="performance-buttons"><button class="button button-primary" data-action="perform">공연 시작 →</button><button class="button" data-action="skip">이번 주 쉬기</button></div><p class="warning">공연은 주차당 한 번 진행하며, 시작하면 남은 행동 포인트를 사용할 수 없습니다.</p>` : `<div class="result">${result.skipped ? `<div class="result-grade">—</div><h3>이번 주는 쉬어갑니다</h3><p>다음 주에 더 좋은 공연을 준비하세요.</p>` : `<div class="result-grade">${result.grade}</div><h3>${result.success ? '무대를 빛냈어요!' : '다음 무대를 준비해요'}</h3><p>공연 점수 ${result.score}점 · ${result.songs.map(escapeHtml).join(' / ')}</p><div class="result-data"><span>정산 수입 +${format(result.earned)}원</span>${result.venueFee ? `<span>공연장 수수료 -${format(result.venueFee)}원</span>` : ''}<span>팬 +${format(result.newFans)}명</span><span>명성 +${result.fame}</span></div>${result.newSongs?.length ? `<p class="new-song-note">새 노래 완성: ${result.newSongs.map(escapeHtml).join(' · ')}</p>` : ''}`}</div><button class="button button-primary" data-action="next">다음 주로 →</button>`}</section>
        <div class="help"><strong>공연 팁</strong> · 연주력, 무대 매력, 체력, 팀 호흡, 관계 평균, 홍보 기대감과 장비가 점수에 반영됩니다. 공연을 쉬어도 다음 주로 진행할 수 있어요.</div>
        <div style="margin-top:18px"><button class="button button-danger button-small" data-action="reset">새 밴드 만들기</button></div>
      </div></div>`;
  }

  function renderGameOver() {
    app.innerHTML = `<section class="ending"><div class="eyebrow">THE BAND HAS ENDED</div><h1>GAME<br><span>OVER.</span></h1><p><strong>${escapeHtml(state.name)}</strong>${particle(state.name, '은', '는')} ${format(state.week)}주차에 해체됐습니다.<br>${escapeHtml(state.gameOverReason)}</p><div class="dashboard">${metric('활동 주차', format(state.week))}${metric('마지막 팬', format(state.fans))}${metric('공연 횟수', format(state.shows))}${metric('총 수입', format(state.totalEarned), '원')}</div><div class="button-row"><button class="button button-primary" data-action="reset">새 밴드로 다시 시작 →</button></div></section>`;
  }

  function render() {
    if (!state) renderSetup();
    else if (state.phase === 'gameover') renderGameOver();
    else renderGame();
  }

  app.addEventListener('input', event => {
    if (event.target.id === 'band-name') draft.name = event.target.value;
  });
  app.addEventListener('change', event => {
    const id = event.target.dataset.song;
    if (!id || !state || state.phase !== 'prep') return;
    if (event.target.checked) {
      const limit = maxSetlistSize(state.offer);
      if (state.setlist.length >= limit) { event.target.checked = false; notify(`이번 무대의 세트리스트에는 최대 ${limit}곡을 넣을 수 있습니다.`); return; }
      state.setlist.push(id);
    } else state.setlist = state.setlist.filter(song => song !== id);
    save();
  });
  app.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'reroll') { draft.members = createRoster(); draft.rolls += 1; render(); }
    else if (action === 'start') startGame();
    else if (['ensemble', 'practice', 'promo', 'rest', 'gear', 'talk'].includes(action)) runAction(action);
    else if (action === 'perform') perform();
    else if (action === 'skip') skipShow();
    else if (action === 'next') nextWeek();
    else if (action === 'reset') resetGame();
  });

  render();
})();
