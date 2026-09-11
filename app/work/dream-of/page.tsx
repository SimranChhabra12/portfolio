import { T } from "@/components/casestudy2/tokens";
import { CaseStudyFooter } from "@/components/casestudy2/CaseStudyChrome";
import Nav from "@/components/ui/Nav";
import Section, { P, H3, Caption } from "@/components/casestudy2/Section";
import SectionIndex from "@/components/casestudy2/SectionIndex";
import CaseStudyHeadline from "@/components/casestudy2/CaseStudyHeadline";
import ContextAndRole from "@/components/casestudy2/ContextAndRole";
import DecisionCard from "@/components/casestudy2/DecisionCard";
import ThreeWomen from "@/components/casestudy2/dreamof/ThreeWomen";
import FeatureVisual from "@/components/casestudy2/FeatureVisual";
import HeroCover from "@/components/casestudy2/dreamof/HeroCover";
import ScrollShot, { type Shot } from "@/components/casestudy2/dreamof/ScrollShot";
import { DIMS } from "@/components/casestudy2/dreamof/screens";
import { CaseStudyShell, Prose, Media } from "../_components/columns";

export const metadata = {
  title: "Dream Of — Simran Chhabra",
  description:
    "Research with 30 women and the first iteration of an online store for Dream Of, a haircare brand made for Indian hair.",
};

// Dream Of has its own shape rather than the shared eight-section skeleton.
// Simran's call (2026-09-10): the case study follows the research (who these
// women are, what they'd given up on, what the store had to do about it) and
// then shows her first-iteration screens in full. The live dreamof.in is a later
// build by someone else and is described as that, never shown as her design.

// Pinned contents index. Keep in step with the <Section> ids below.
const SECTIONS = [
  { id: "context", number: "01", label: "Context" },
  { id: "research", number: "02", label: "Research" },
  { id: "decisions", number: "03", label: "Design Decisions" },
  { id: "product", number: "04", label: "The Product" },
  { id: "landed", number: "05", label: "Where It Landed" },
  { id: "next", number: "06", label: "What I'd Do Next" },
  { id: "takeaway", number: "07", label: "What I Took Away" },
];

// Every screen lives in public/projects/dream-of/screens/, with its size in DIMS.
function shot(name: string, alt: string): Shot {
  const [pixelWidth, pixelHeight] = DIMS[name];
  return { src: `/projects/dream-of/screens/${name}.jpg`, alt, pixelWidth, pixelHeight };
}

export default function DreamOfPage() {
  return (
    <main style={{ backgroundColor: T.cream }} className="min-h-screen overflow-x-hidden">
      <Nav coverId="dream-of-cover" />
      <SectionIndex items={SECTIONS} alignWithId="dream-of-headline" revealWithId="dream-of-headline" />

      <HeroCover />

      <CaseStudyShell className="pt-20">
        <div style={{ paddingBottom: T.space.section }}>
          <CaseStudyHeadline
            id="dream-of-headline"
            headline="Dream Of: Haircare solutions formulated for Indian hair types"
            meta={[
              { label: "Role", value: "Product Design Intern · User Research · Storefront Design" },
              { label: "Platform", value: "Web, desktop + mobile" },
              { label: "Timeline", value: "3 months | Jun – Aug 2025" },
            ]}
          />

          <div className="mt-16">
            <ContextAndRole
              columns={[
                {
                  heading: "What is Dream Of?",
                  body:
                    "Dream Of is a haircare brand made for Indian hair. The products are formulated for what our cities do to it: humidity, heat, pollution and hard water. There are 4 products. Someone I know formulated them, and this was the brand's first online store.",
                },
                {
                  heading: "My Role",
                  body:
                    "I interviewed about 30 women about their hair and the products they'd tried. Then I designed the first version of the store for desktop and mobile: the homepage, the shop page, all 4 product pages and the about page. The formulas, packaging and photos are the brand's. The site that's live at dreamof.in now was rebuilt by someone else later.",
                },
              ]}
            />
          </div>
        </div>
      </CaseStudyShell>

      <CaseStudyShell>
        <div className="flex flex-col min-w-0">
          <Section id="context" number="01" heading="Context" first>
            <Prose>
              <P>
                Each product came from a gap in what you could buy for Indian hair.
              </P>
              <P>
                <strong>Instant Refresh</strong>{" "}is a tinted dry shampoo. Most dry shampoos leave a
                white cast on dark hair, and very few are small enough to carry around. Indian hair
                also gets oily and builds up fast because of the pollution, the weather and
                everyday stress.
              </P>
              <P>
                <strong>Fresh Start</strong>{" "}is a clarifying shampoo scrub. A lot of women only use
                shampoo, and shampoo doesn&apos;t get all the buildup off the scalp. That buildup
                can make things like dandruff worse.
              </P>
              <P>
                <strong>Soft Landing</strong>{" "}is a leave-in conditioner and serum. It&apos;s not
                just for wash day. You can use it on day 2 or 3 to keep your hair shiny, and it
                works well with the dry shampoo.
              </P>
              <P>
                <strong>Smooth Route</strong>{" "}is a lightweight hair mask for frizz.
              </P>
            </Prose>
            <Media>
              <FeatureVisual
                kind="plain"
                plainMaxWidth={1000}
                images={[
                  shot("banner-made-for-india", "Dream Of banner: Not just marketed to India. Made for it."),
                ]}
              />
            </Media>
          </Section>

          <Section id="research" number="02" heading="Research">
            <Prose>
              <P>
                I talked to about 30 women, 25 to 40, across Tier 1 and Tier 2 cities, about their
                hair and every product they&apos;d tried on it.
              </P>
              {/* [TBD] Anything Simran remembers people actually said. Don't reconstruct quotes. */}
              <P>
                I expected to hear about frizz and oily hair, and I did. What surprised me was how
                many of them had given up on finding products that worked.
              </P>
              <P>
                A lot of products promise results after a few months of use. When they didn&apos;t
                see those results, they were tired of being disappointed, so they stopped trying
                new things.
              </P>
              <P>
                So the store couldn&apos;t just explain the products. It had to give them a reason
                to try one more time.
              </P>
            </Prose>
          </Section>

          <Section id="decisions" number="03" heading="Design Decisions">
            <Prose>
              <P>Here are 3 decisions I made on the first iteration, and why.</P>
            </Prose>
            <Media>
              <ThreeWomen />
            </Media>
            <Media>
              <DecisionCard
                project="dreamofLight"
                variant="notes"
                index={1}
                choice="Put the before-and-afters near the top of every product page"
                insteadOf="Saving them for a reviews section at the bottom"
                because="A lot of the women I talked to had used a product for months, seen nothing change, and given up. I didn't want to ask them to wait months again. So the before-and-afters from real women in Thane, Delhi and Nagaland come right after the product details."
                research="About 30 interviews. A lot of them had stopped trying products that promised results after months."
              />
            </Media>
            <Media>
              <DecisionCard
                project="dreamofLight"
                variant="notes"
                index={2}
                choice="Let people shop by what their hair is doing"
                insteadOf="Only a grid of the 4 products"
                because="The women I talked to described their hair, like a flaky scalp or frizz the minute they step outside, rather than a product. So Shop The Range has 3 tabs, Wash Extenders, Frizz Tamers and Dry Scalp & Hair Rescuers, and each one has a woman with that hair saying what worked for her."
              />
            </Media>
            <Media>
              <DecisionCard
                project="dreamofLight"
                variant="notes"
                index={3}
                choice="Compare Instant Refresh to the dry shampoo they already know"
                insteadOf="Just listing ingredients and benefits"
                because="Most dry shampoos in India come in an aerosol can and leave a white cast on dark hair. If you've tried one, that's what you're worried about. So the product page puts them side by side: tinted powder vs white streaks, and a puff vs a spray that goes everywhere."
              />
            </Media>
          </Section>

          <Section id="product" number="04" heading="The Product">
            <Prose>
              <P>
                These are the screens from my first version. Each frame scrolls, so you can go
                through the whole page.
              </P>
            </Prose>

            <Prose>
              <H3>Homepage</H3>
              <P>
                The homepage starts with the 4 products, then why they&apos;re made for Indian
                hair, the story behind the brand, and before-and-afters from real customers. Shop
                The Range is near the bottom.
              </P>
            </Prose>
            <Media>
              <ScrollShot
                desktop={shot("home-desktop", "Dream Of homepage, desktop, first iteration")}
                mobile={shot("home-mobile", "Dream Of homepage, mobile, first iteration")}
              />
            </Media>

            <Prose>
              <H3>Shop The Range</H3>
              <P>
                This is decision 2. You pick the hair type that sounds like yours, and it shows
                the products for it along with a quote from a woman with that hair.
              </P>
            </Prose>
            <Media>
              {/* The desktop design is landscape (1600x777), about 350px tall at this
                  width, so a taller frame just shows white under it. */}
              <ScrollShot
                height={400}
                desktop={shot("range-dry-scalp-desktop", "Shop The Range with Dry Scalp & Hair Rescuers selected, desktop")}
                mobile={shot("range-mobile-frizz", "Shop The Range with Frizz Tamers selected, mobile")}
              />
            </Media>

            <Prose>
              <H3>Product page: Instant Refresh</H3>
              <P>
                Instant Refresh was the hardest product to sell, because people don&apos;t trust
                dry shampoo on dark hair. The page starts with &ldquo;Other dry shampoos, instant
                regret,&rdquo; then shows before-and-afters from 3 women, then compares it to other
                dry shampoos, and then the ingredients.
              </P>
            </Prose>
            <Media>
              <ScrollShot
                height={720}
                desktop={shot("pdp-instant-refresh-desktop", "Instant Refresh product page, desktop, first iteration")}
                mobile={shot("pdp-instant-refresh-mobile", "Instant Refresh product page, mobile, first iteration")}
              />
            </Media>

            <Prose>
              <H3>The other 3 product pages</H3>
              <P>
                These follow the same layout as Instant Refresh: what the product does, reviews,
                a comparison with other products, and the ingredients.
              </P>
            </Prose>
            <Media>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <ScrollShot
                  height={520}
                  desktop={shot("pdp-fresh-start-desktop", "Fresh Start product page, desktop")}
                  caption="Fresh Start"
                />
                <ScrollShot
                  height={520}
                  desktop={shot("pdp-soft-landing-desktop", "Soft Landing product page, desktop")}
                  caption="Soft Landing"
                />
                <ScrollShot
                  height={520}
                  desktop={shot("pdp-smooth-route-desktop", "Smooth Route product page, desktop")}
                  caption="Smooth Route"
                />
              </div>
            </Media>

            <Prose>
              <H3>Shop and About</H3>
            </Prose>
            <Media>
              <ScrollShot
                height={560}
                desktop={shot("collection-desktop", "Shop all page, desktop")}
                mobile={shot("collection-mobile", "Shop all page, mobile")}
              />
            </Media>
            <Media>
              <ScrollShot
                desktop={shot("about-desktop", "About page, desktop")}
                mobile={shot("about-mobile", "About page, mobile")}
              />
            </Media>
          </Section>

          <Section id="landed" number="05" heading="Where It Landed">
            <Prose>
              <P>
                The site that&apos;s live at dreamof.in now was rebuilt by someone else after my
                version. Some of my work is still there, like the before-and-afters, the comparison
                with other dry shampoos and most of the FAQ.
              </P>
              <P>Shop The Range was taken out. The live shop page is a product grid.</P>
              <P>
                Bundles were added later, 6 pairs like dry shampoo + leave-in. That&apos;s the
                day 2 and day 3 combo the products were made for, but the live page only shows
                prices and doesn&apos;t explain why the pairs go together.
              </P>
              <Caption>
                I don&apos;t have sales numbers for either version, so I can&apos;t say which one
                works better.
              </Caption>
            </Prose>
          </Section>

          <Section id="next" number="06" heading="What I'd Do Next">
            <Prose>
              <P>
                <strong>Design for returning customers.</strong>{" "}My version was built for someone
                seeing Dream Of for the first time. Someone coming back needs an easy way to
                reorder and to find the next product to try.
              </P>
              <P>
                <strong>Explain the bundles.</strong>{" "}The pairs already exist on the live site.
                They need a line about when to use each one, like wash day vs day 2 or 3.
              </P>
              <P>
                <strong>Test shop by hair type against a product grid.</strong>{" "}I think it helps
                people find the right product, but I didn&apos;t test it. Showing the same 4
                products both ways would tell us.
              </P>
            </Prose>
          </Section>

          <Section id="takeaway" number="07" heading="What I Took Away">
            <Prose>
              <P>
                I thought my job was to explain 4 products clearly. After talking to 30 women, I
                realized they already knew a lot about their hair. They just didn&apos;t believe
                new products would work anymore.
              </P>
              <P>So the store had to show proof early, before asking them to buy anything.</P>
            </Prose>
          </Section>
        </div>
      </CaseStudyShell>

      <CaseStudyFooter />
    </main>
  );
}
