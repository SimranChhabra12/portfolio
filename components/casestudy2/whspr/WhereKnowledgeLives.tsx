import { T } from "../tokens";

const W = T.whspr;

// Where the knowledge women already share actually lives, and what each place
// knows about the person who left it.
//
// Two axes, both from the research rather than from the feature list. Rows ask
// whose testimony a system treats as real (Fricker). Columns ask how far it
// reaches — the one thing the group chat fails at, and the reason Whspr exists.
//
// Whspr is deliberately not plotted. The top row is empty across every level of
// reach, which is the claim: nothing verifies that the woman telling you about a
// place is a woman who was there.

type Icon = { d: string; color: string };

// Brand marks from simple-icons (CC0), in their official colors. Word of mouth
// and Citizen have no usable mark, so those two are drawn to match.
const ICONS: Record<string, Icon> = {
  yelp: { d: "m7.6885 15.1415-3.6715.8483c-.3769.0871-.755.183-1.1452.155-.2611-.0188-.5122-.0414-.7606-.213a1.179 1.179 0 0 1-.331-.3594c-.3486-.5519-.3656-1.3661-.3697-2.0004a6.2874 6.2874 0 0 1 .3314-2.0642 1.857 1.857 0 0 1 .1073-.2474 2.3426 2.3426 0 0 1 .1255-.2165 2.4572 2.4572 0 0 1 .1563-.1975 1.1736 1.1736 0 0 1 .399-.2831 1.082 1.082 0 0 1 .4592-.0837c.2355.0016.5139.052.91.1734.0555.0191.1237.0382.1856.0572.3277.1013.7048.2404 1.1499.3987.6863.2404 1.3663.487 2.0463.7397l1.2117.4423c.2217.0807.4363.18.6412.297.174.0984.3273.2298.4512.387a1.217 1.217 0 0 1 .192.4309 1.2205 1.2205 0 0 1-.872 1.4522c-.0468.0151-.0852.0239-.1085.0293l-1.105.2553-.0031-.001zM18.8208 7.565a1.8506 1.8506 0 0 0-.2042-.1754 2.4082 2.4082 0 0 0-.2077-.1394 2.3607 2.3607 0 0 0-.2269-.109 1.1705 1.1705 0 0 0-.482-.0796 1.0862 1.0862 0 0 0-.4498.1263c-.2107.1048-.4388.2732-.742.5551-.042.0417-.0947.0886-.142.133-.2502.2351-.5286.5252-.8599.863a114.6363 114.6363 0 0 0-1.5166 1.5629l-.8962.9293a4.1897 4.1897 0 0 0-.4466.5483 1.541 1.541 0 0 0-.2364.5459 1.2199 1.2199 0 0 0 .0107.4518l.0046.02a1.218 1.218 0 0 0 1.4184.923 1.162 1.162 0 0 0 .1105-.0213l4.7781-1.104c.3766-.087.7587-.1667 1.097-.3631.2269-.1316.4428-.262.5909-.5252a1.1793 1.1793 0 0 0 .1405-.4683c.0733-.6512-.2668-1.3908-.5403-1.963a6.2792 6.2792 0 0 0-1.2001-1.7103zM8.9703.0754a8.6724 8.6724 0 0 0-.83.1564c-.2754.066-.548.1383-.8146.2236-.868.2844-2.0884.8063-2.295 1.8065-.1165.5655.1595 1.1439.3737 1.66.2595.6254.614 1.1889.9373 1.7777.8543 1.5545 1.7245 3.0993 2.5922 4.6457.259.4617.5416 1.0464 1.043 1.2856a1.058 1.058 0 0 0 .1013.0383c.2248.0851.4699.1016.7041.0471a4.3015 4.3015 0 0 0 .0418-.0097 1.2136 1.2136 0 0 0 .5658-.3397 1.1033 1.1033 0 0 0 .079-.0822c.3463-.435.3454-1.0833.3764-1.6134.1042-1.771.2139-3.5423.3009-5.3142.0332-.6712.1055-1.3333.0655-2.0096-.0328-.5579-.0368-1.1984-.3891-1.6563-.6218-.8073-1.9476-.741-2.8523-.6158zm2.084 15.9505a1.1053 1.1053 0 0 0-1.2306-.4145 1.1398 1.1398 0 0 0-.1526.0633 1.4806 1.4806 0 0 0-.2171.1354c-.1992.1475-.3668.3392-.5196.5315-.0386.049-.074.1143-.12.1562l-.7686 1.0573a113.9168 113.9168 0 0 0-1.2913 1.789c-.278.3895-.5184.7184-.7083 1.0094-.036.0547-.0734.116-.1075.1647-.2277.3522-.3566.6092-.4228.8381a1.0945 1.0945 0 0 0-.046.4721c.0211.1655.0768.3246.1635.467.046.0715.0957.1406.1487.207a2.334 2.334 0 0 0 .1754.1825 1.843 1.843 0 0 0 .2108.1732c.5304.369 1.1112.6342 1.722.8391a6.0958 6.0958 0 0 0 1.5716.3004c.091.0046.1821.0025.2728-.006a2.3878 2.3878 0 0 0 .2506-.0351 2.3862 2.3862 0 0 0 .2447-.071 1.1927 1.1927 0 0 0 .4175-.2658c.1127-.113.1994-.249.2541-.3989.0889-.2214.1473-.5026.1857-.92.0034-.0593.0118-.1305.0177-.1958.0304-.3463.0443-.7531.0666-1.2315.0375-.7357.067-1.4681.0903-2.2026 0 0 .0495-1.3053.0494-1.306.0113-.3008.002-.6342-.0814-.9336a1.396 1.396 0 0 0-.1756-.4054zm8.6754 2.0439c-.1605-.176-.3878-.3514-.7462-.5682-.0518-.0288-.1124-.0674-.1684-.1009-.2985-.1795-.658-.3684-1.078-.5965a120.7615 120.7615 0 0 0-1.9427-1.042l-1.1515-.6107c-.0597-.0175-.1203-.0607-.1766-.0878-.2212-.1058-.4558-.2045-.6992-.2498a1.4915 1.4915 0 0 0-.2545-.0265 1.1527 1.1527 0 0 0-.1648.01 1.1077 1.1077 0 0 0-.9227.9133 1.4186 1.4186 0 0 0 .0159.439c.0563.3065.1932.6096.3346.875l.615 1.1526c.3422.65.6884 1.2963 1.0435 1.9406.229.4202.4196.7799.5982 1.078.0338.056.0721.1163.1011.1682.2173.3584.392.584.569.7458.1146.1107.252.195.4026.247.1583.0525.326.071.4919.0546a2.368 2.368 0 0 0 .251-.0435c.0817-.022.1622-.048.241-.0784a1.863 1.863 0 0 0 .2475-.1143 6.1018 6.1018 0 0 0 1.2818-.9597c.4596-.4522.8659-.9454 1.182-1.51.044-.08.0819-.163.1138-.2483a2.49 2.49 0 0 0 .0773-.2411c.0186-.083.033-.1669.0429-.2513a1.188 1.188 0 0 0-.0565-.491 1.0933 1.0933 0 0 0-.248-.4041zm2.86 3.742a.8523.8523 0 0 1-.111.4236c-.074.132-.178.2377-.3115.3172a.8428.8428 0 0 1-.4385.119.847.847 0 0 1-.4373-.1179.8526.8526 0 0 1-.3125-.3171.8548.8548 0 0 1-.111-.4248c0-.1526.038-.2958.1143-.4294a.8405.8405 0 0 1 .315-.3159.849.849 0 0 1 .4315-.1156.8514.8514 0 0 1 .4294.1144.84.84 0 0 1 .316.3148.8494.8494 0 0 1 .1156.4317zm-.1202 0c0-.1328-.0332-.256-.0996-.3698s-.1564-.2038-.2702-.2702a.7125.7125 0 0 0-.371-.1007.7204.7204 0 0 0-.3698.0996.7487.7487 0 0 0-.2713.2702.7181.7181 0 0 0-.0996.3709c0 .132.0332.2557.0996.371a.7355.7355 0 0 0 .2713.2713.7354.7354 0 0 0 .3698.0985.7205.7205 0 0 0 .3698-.0996.7423.7423 0 0 0 .2702-.2691.7186.7186 0 0 0 .1008-.3721zm-.577.0584.2724.4522h-.1922l-.237-.4052h-.1546v.4052h-.1695v-1.02h.2988c.1268 0 .2195.0247.2783.0744.0595.0496.0892.1252.0892.2267a.2785.2785 0 0 1-.0492.1625c-.032.0466-.0775.0813-.1362.1042zm-.0412-.1408a.1532.1532 0 0 0 .056-.1214c0-.0573-.0164-.0981-.0491-.1225-.0329-.0251-.0847-.0377-.1557-.0377h-.1214v.3285h.1237c.061 0 .1098-.0157.1465-.047z", color: "#FF1A1A" },
  facebook: { d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z", color: "#0866FF" },
  whatsapp: { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z", color: "#25D366" },
  reddit: { d: "M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z", color: "#FF4500" },
  imessage: { d: "M5.285 0A5.273 5.273 0 0 0 0 5.285v13.43A5.273 5.273 0 0 0 5.285 24h13.43A5.273 5.273 0 0 0 24 18.715V5.285A5.273 5.273 0 0 0 18.715 0ZM12 4.154a8.809 7.337 0 0 1 8.809 7.338A8.809 7.337 0 0 1 12 18.828a8.809 7.337 0 0 1-2.492-.303A8.656 7.337 0 0 1 5.93 19.93a9.929 7.337 0 0 0 1.54-2.155 8.809 7.337 0 0 1-4.279-6.283A8.809 7.337 0 0 1 12 4.154", color: "#34DA50" },
  google: { d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z", color: "#4285F4" },
  wordofmouth: { d: "M9 11.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm7.4.3a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM9 12.8c-3.2 0-6 1.65-6 3.7V19h12v-2.5c0-2.05-2.8-3.7-6-3.7Zm7.4.5c-.66 0-1.29.06-1.87.18 1.3.92 2.07 2.16 2.07 3.52V19H21v-2.2c0-1.78-2.13-3.5-4.6-3.5Z", color: "#C9C9D4" },
  citizen: { d: "M12 9.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm-4.6-2.35a1 1 0 0 1 .07 1.41 4.6 4.6 0 0 0 0 6.28 1 1 0 1 1-1.48 1.34 6.6 6.6 0 0 1 0-8.96 1 1 0 0 1 1.41-.07Zm9.2 0a1 1 0 0 1 1.41.07 6.6 6.6 0 0 1 0 8.96 1 1 0 0 1-1.48-1.34 4.6 4.6 0 0 0 0-6.28 1 1 0 0 1 .07-1.41ZM4.62 3.9a1 1 0 0 1 .06 1.42 9.8 9.8 0 0 0 0 13.36 1 1 0 1 1-1.48 1.35 11.8 11.8 0 0 1 0-16.06A1 1 0 0 1 4.62 3.9Zm14.76 0a1 1 0 0 1 1.42.07 11.8 11.8 0 0 1 0 16.06 1 1 0 0 1-1.48-1.35 9.8 9.8 0 0 0 0-13.36 1 1 0 0 1 .06-1.42Z", color: "#F2C230" },
};

type Mark = "removable" | "alarmist";
type Entry = { icon: keyof typeof ICONS; name: string; short?: string; sub?: string; mark?: Mark };

const KNOWN: Entry[] = [
  { icon: "imessage", name: "iMessage" },
  { icon: "whatsapp", name: "WhatsApp" },
  { icon: "wordofmouth", name: "Word of mouth" },
];
const CLAIMED: Entry[] = [
  { icon: "facebook", name: "Are We Dating The Same Guy", short: "AWDTSG", sub: "Facebook group", mark: "removable" },
];
const STRANGERS_COMMUNITY: Entry[] = [{ icon: "reddit", name: "Reddit", sub: "Ask, wait, maybe" }];
const STRANGERS_PUBLIC: Entry[] = [
  { icon: "google", name: "Google", sub: "4.2 stars", mark: "removable" },
  { icon: "yelp", name: "Yelp", sub: "Price, wait", mark: "removable" },
  { icon: "citizen", name: "Citizen", sub: "Crime alerts", mark: "alarmist" },
];

const COLS = ["People you know", "A community you joined", "Anyone"];
const ROWS: { label: string; cells: (Entry[] | null)[] }[] = [
  { label: "Women, verified", cells: [null, null, null] }, // rendered as one span
  { label: "Women you know", cells: [KNOWN, null, null] },
  { label: "Women, self-claimed", cells: [null, CLAIMED, null] },
  { label: "Strangers", cells: [null, STRANGERS_COMMUNITY, STRANGERS_PUBLIC] },
];

const MARK_COLOR: Record<Mark, string> = { alarmist: W.amber, removable: W.amberDim };

const microLabel = {
  fontFamily: "var(--font-body), sans-serif",
  fontWeight: 400,
  fontSize: "0.6875rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: W.dusk500,
  lineHeight: 1.4,
};

function Dot({ mark }: { mark: Mark }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{ width: 6, height: 6, borderRadius: "50%", background: MARK_COLOR[mark] }}
    />
  );
}

// One platform: a small mark, its name, and what it actually gives you.
// Laid out as a row so three of them stack inside a cell instead of
// competing for horizontal space they do not have.
function Item({ entry }: { entry: Entry }) {
  const ico = ICONS[entry.icon];
  return (
    <li className="flex items-center gap-2 min-w-0">
      <span
        className="grid place-items-center shrink-0"
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.09)",
        }}
      >
        <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
          <path d={ico.d} fill={ico.color} />
        </svg>
      </span>
      <span className="flex flex-col min-w-0">
        <span className="flex items-center gap-1.5 min-w-0">
          {entry.mark && <Dot mark={entry.mark} />}
          <b
            className="[display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 500,
              fontSize: "0.78rem",
              lineHeight: 1.25,
              color: W.textLight,
            }}
          >
            {entry.short ? (
              <>
                {/* no phone-width cell can hold the full group name */}
                <span className="sm:hidden">{entry.short}</span>
                <span className="hidden sm:inline">{entry.name}</span>
              </>
            ) : (
              entry.name
            )}
          </b>
        </span>
        {entry.sub && (
          <span
            className="truncate hidden sm:block"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "0.66rem",
              lineHeight: 1.35,
              color: W.dusk500,
            }}
          >
            {entry.sub}
          </span>
        )}
      </span>
    </li>
  );
}

function Cell({ entries }: { entries: Entry[] | null }) {
  return (
    <td
      className="align-middle rounded-[14px] p-2 sm:p-2.5"
      style={{ background: entries ? W.surface1 : "rgba(255,255,255,.022)", width: "29%" }}
    >
      <ul className="flex flex-col justify-center gap-2 list-none m-0 p-0 overflow-hidden h-[112px]">
        {entries?.map((e) => (
          <Item key={e.name} entry={e} />
        ))}
      </ul>
    </td>
  );
}

export default function WhereKnowledgeLives() {
  return (
    <figure className="w-full my-2 m-0">
      {/* Title sits above the block, with the two axes named before the reader
          meets them. */}
      <figcaption className="mb-4">
        <h3
          style={{
            fontFamily: "var(--font-display), serif",
            fontWeight: 400,
            fontSize: T.type.sub,
            color: T.ink,
            margin: "0 0 0.5rem",
          }}
        >
          Where the knowledge lives today
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: T.inkMuted,
            maxWidth: "62ch",
            margin: 0,
          }}
        >
          Down the side: whether you know a woman is speaking from experience. Across the top: how
          far what she said can travel.
        </p>
      </figcaption>

      <div
        style={{
          backgroundColor: W.midnight,
          borderRadius: T.radius.darkBlock,
          padding: "clamp(0.875rem, 0.5rem + 1.6vw, 1.75rem)",
        }}
      >
        <table
          className="w-full"
          style={{ borderCollapse: "separate", borderSpacing: 7, tableLayout: "fixed" }}
        >
          <caption className="sr-only">
            Platforms where women share knowledge about places, arranged by whether the speaker is a
            verified woman and by how far the information reaches.
          </caption>
          <thead>
            <tr>
              <td className="p-0 align-bottom" style={{ width: "13%", background: "none" }}>
                <span style={{ ...microLabel, color: W.dusk400 }}>Reach &rarr;</span>
              </td>
              {COLS.map((c) => (
                <th key={c} scope="col" className="align-bottom pb-1" style={microLabel}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="text-left align-middle pr-2"
                  style={{ ...microLabel, color: i === 0 ? W.amber : W.dusk500 }}
                >
                  {row.label}
                </th>
                {i === 0 ? (
                  // The claim: nothing verifies, at any reach. One span so the
                  // emptiness reads as a single fact, not three coincidences.
                  <td
                    colSpan={3}
                    className="rounded-[14px] h-[128px] sm:h-[132px]"
                    style={{
                      background: "rgba(255,136,48,.06)",
                      border: "1.5px dashed rgba(255,136,48,.45)",
                    }}
                  />
                ) : (
                  row.cells.map((c, j) => <Cell key={j} entries={c} />)
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,.07)",
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.75rem",
            color: W.dusk400,
          }}
        >
          <span className="flex items-center gap-2">
            <Dot mark="alarmist" /> Frames places as threats
          </span>
          <span className="flex items-center gap-2">
            <Dot mark="removable" /> The business can get it taken down
          </span>
          <span className="flex items-center gap-2">
            <i
              className="shrink-0"
              style={{
                width: 22,
                height: 12,
                borderRadius: 4,
                border: "1.5px dashed rgba(255,136,48,.45)",
                background: "rgba(255,136,48,.06)",
              }}
            />
            Nothing here
          </span>
        </div>
      </div>
    </figure>
  );
}
