const XRegExp = require('xregexp');

/*
 * Define Unicode-aware Character Classes. Experimental!
 * Using: http://apps.timwhitlock.info/js/regex
 */

// Separators: Zl Zp Zs (all)
const separatorChars = '(?:[ \\u00a0\\u1680\\u180e\\u2000-\\u200a\\u2028-\\u2029\\u202f\\u205f\\u3000])';

// Punctuations: Pc Pd Pe Pf Pi Po Ps (all), Punctuation: General Punctuation, Supplemental Punctuation, CJK Symbols and Punctuation, Cuniform Numbers and Punctuation (all)
const punctuationChars = '(?:[!-#%-*,-/:-;?-@[-\\]_{}¡«·»¿;·՚-՟։-֊־׀׃׆׳-״؉-؊،-؍؛؞-؟٪-٭۔܀-܍߷-߹।-॥॰෴๏๚-๛༄-༒༺-༽྅࿐-࿔၊-၏჻፡-፨᙭-᙮᚛-᚜᛫-᛭᜵-᜶។-៖៘-៚᠀-᠊᥄-᥅᧞-᧟᨞-᨟᭚-᭠᰻-᰿᱾-᱿\\u2000-\\u206e⁽-⁾₍-₎〈-〉❨-❵⟅-⟆⟦-⟯⦃-⦘⧘-⧛⧼-⧽⳹-⳼⳾-⳿⸀-\\u2e7e\\u3000-〾゠・꘍-꘏꙳꙾꡴-꡷꣎-꣏꤮-꤯꥟꩜-꩟﴾-﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪-﹫！-＃％-＊，-／：-；？-＠［-］＿｛｝｟-･]|\\ud800[\\udd00-\\udd01\\udf9f\\udfd0]|\\ud802[\\udd1f\\udd3f\\ude50-\\ude58]|\\ud809[\\udc00-\\udc7e])';

 // TODO: use http://apps.timwhitlock.info/js/regex
const numberPattern = "(?:[0-9]+(?:[.,:'](?=[0-9]))?)+";

// Letters: Ll Lm Lo Lt Lu (all), Numbers: Nd Nl No (all) and Punctuation: Pc and Pd
const wordChars = '(?:[-0-9A-Za-zª²-³µ¹-º¼-¾À-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶ-ͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԣԱ-Ֆՙա-ևא-תװ-ײء-ي٠-٩ٮ-ٯٱ-ۓەۥ-ۦۮ-ۼۿܐܒ-ܯݍ-ޥޱ߀-ߪߴ-ߵߺऄ-हऽॐक़-ॡ०-९ॱ-ॲॻ-ॿঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡ০-ৱ৴-৹ਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼੦-੯ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡ૦-૯ଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡ୦-୯ୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹௐ௦-௲అ-ఌఎ-ఐఒ-నప-ళవ-హఽౘ-ౙౠ-ౡ౦-౯౸-౾ಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡ೦-೯അ-ഌഎ-ഐഒ-നപ-ഹഽൠ-ൡ൦-൵ൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆ๐-๙ກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆ໐-໙ໜ-ໝༀ༠-༳ཀ-ཇཉ-ཬྈ-ྋက-ဪဿ-၉ၐ-ၕၚ-ၝၡၥ-ၦၮ-ၰၵ-ႁႎ႐-႙Ⴀ-Ⴥა-ჺჼᄀ-ᅙᅟ-ᆢᆨ-ᇹሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፩-፼ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙶᚁ-ᚚᚠ-ᛪ\\u16ee-\\u16f0ᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜ០-៩៰-៹᠐-᠙ᠠ-ᡷᢀ-ᢨᢪᤀ-ᤜ᥆-ᥭᥰ-ᥴᦀ-ᦩᧁ-ᧇ᧐-᧙ᨀ-ᨖᬅ-ᬳᭅ-ᭋ᭐-᭙ᮃ-ᮠᮮ-᮹ᰀ-ᰣ᱀-᱉ᱍ-ᱽᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ⁰-ⁱ⁴-⁹ⁿ-₉ₐ-ₔℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎ⅓-\\u2188①-⒛⓪-⓿❶-➓Ⰰ-Ⱞⰰ-ⱞⱠ-Ɐⱱ-ⱽⲀ-ⳤ⳽ⴀ-ⴥⴰ-ⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-\\u3007\\u3021-\\u3029〱-〵\\u3038-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎ㆒-㆕ㆠ-ㆷㇰ-ㇿ㈠-㈩㉑-㉟㊀-㊉㊱-㊿㐀-䶵一-鿃ꀀ-ꒌꔀ-ꘌꘐ-ꘫꙀ-ꙟꙢ-ꙮꙿ-ꚗꜗ-ꜟꜢ-ꞈꞋ-ꞌꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳ꣐-꣙꤀-ꤥꤰ-ꥆꨀ-ꨨꩀ-ꩂꩄ-ꩋ꩐-꩙가-힣豈-鶴侮-頻並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]|[\\ud840-\\ud868][\\udc00-\\udfff]|\\ud800[\\udc00-\\udc0b\\udc0d-\\udc26\\udc28-\\udc3a\\udc3c-\\udc3d\\udc3f-\\udc4d\\udc50-\\udc5d\\udc80-\\udcfa\\udd07-\\udd33\\udd40-\\udd78\\udd8a\\ude80-\\ude9c\\udea0-\\uded0\\udf00-\\udf1e\\udf20-\\udf23\\udf30-\\udf4a\\udf80-\\udf9d\\udfa0-\\udfc3\\udfc8-\\udfcf\\udfd1-\\udfd5]|\\ud801[\\udc00-\\udc9d\\udca0-\\udca9]|\\ud802[\\udc00-\\udc05\\udc08\\udc0a-\\udc35\\udc37-\\udc38\\udc3c\\udc3f\\udd00-\\udd19\\udd20-\\udd39\\ude00\\ude10-\\ude13\\ude15-\\ude17\\ude19-\\ude33\\ude40-\\ude47]|\\ud808[\\udc00-\\udf6e]|\\ud809[\\udc00-\\udc62]|\\ud834[\\udf60-\\udf71]|\\ud835[\\udc00-\\udc54\\udc56-\\udc9c\\udc9e-\\udc9f\\udca2\\udca5-\\udca6\\udca9-\\udcac\\udcae-\\udcb9\\udcbb\\udcbd-\\udcc3\\udcc5-\\udd05\\udd07-\\udd0a\\udd0d-\\udd14\\udd16-\\udd1c\\udd1e-\\udd39\\udd3b-\\udd3e\\udd40-\\udd44\\udd46\\udd4a-\\udd50\\udd52-\\udea5\\udea8-\\udec0\\udec2-\\udeda\\udedc-\\udefa\\udefc-\\udf14\\udf16-\\udf34\\udf36-\\udf4e\\udf50-\\udf6e\\udf70-\\udf88\\udf8a-\\udfa8\\udfaa-\\udfc2\\udfc4-\\udfcb\\udfce-\\udfff]|\\ud869[\\udc00-\\uded6]|\\ud87e[\\udc00-\\ude1d]|[\\-_֊־᠆‐-―‿-⁀⁔⸗⸚〜〰゠︱-︴﹍-﹏﹘﹣－＿])';

// Symbols: Sc Sk Sm So
const symbolChars = '(?:[$+<->^`|~¢-©¬®-±´¶¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄-΅϶҂؆-؈؋؎-؏۩۽-۾߶৲-৳৺૱୰௳-௺౿ೱ-ೲ൹฿༁-༃༓-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎-࿏႞-႟፠᎐-᎙៛᥀᧠-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´-῾⁄⁒⁺-⁼₊-₌₠-₵℀-℁℃-℆℈-℉℔№-℘℞-℣℥℧℩℮℺-℻⅀-⅄⅊-⅍⅏←-⌨⌫-⏧␀-␦⑀-⑊⒜-ⓩ─-⚝⚠-⚼⛀-⛃✁-✄✆-✉✌-✧✩-❋❍❏-❒❖❘-❞❡-❧➔➘-➯➱-➾⟀-⟄⟇-⟊⟌⟐-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭌⭐-⭔⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒-〓〠〶-〷〾-〿゛-゜㆐-㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉃㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꜀-꜖꜠-꜡꞉-꞊꠨-꠫﬩﷼-﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼-�]|\\ud800[\\udd02\\udd37-\\udd3f\\udd79-\\udd89\\udd90-\\udd9b\\uddd0-\\uddfc]|\\ud834[\\udc00-\\udcf5\\udd00-\\udd26\\udd29-\\udd64\\udd6a-\\udd6c\\udd83-\\udd84\\udd8c-\\udda9\\uddae-\\udddd\\ude00-\\ude41\\ude45\\udf00-\\udf56]|\\ud835[\\udec1\\udedb\\udefb\\udf15\\udf35\\udf4f\\udf6f\\udf89\\udfa9\\udfc3]|\\ud83c[\\udc00-\\udc2b\\udc30-\\udc93])'

// TODO: use ES6 tagged templates
const tokenizerPattern = XRegExp(
    '(?<separator>' + separatorChars + '+)    |\n' +
    '(?<punctuation>' + punctuationChars + ') |\n' +
    '(?<number>' + numberPattern + ')         |\n' +
    '(?<symbol>' + symbolChars + ')           |\n' +
    '(?<word>' + wordChars + '+)              |\n' +
    '(?<unknown>.)', 'xu');

module.exports = function tokenize(string) {
  // NOTE: stemming should be done on the full corpus and not here
  let tokens = [];

  let pos = 0, match;
  while (
      pos < string.length &&
      (match = XRegExp.exec(string, tokenizerPattern, pos, 'sticky'))
    ) {

    if (match.word)
      tokens.push({ 'word': match.word } );
    else if (match.number)
      tokens.push({ 'number': match.number } );
    else if (match.separator)
      tokens.push({ 'separator': match.separator } );
    else if (match.punctuation)
      tokens.push({ 'punctuation': match.punctuation } );
    else if (match.symbol)
      tokens.push({ 'symbol': match.symbol } );
    else if (match.unknown)
      // TODO: use logger
      console.log("SKIPPING UNMATCHED CHARACTER: " + match.unknown);

    pos += match[0].length;
  }

  return tokens;
}
