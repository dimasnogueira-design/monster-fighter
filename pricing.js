(function initMonsterPricing(root, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.MonsterPricing = api;
  }
})(
  typeof globalThis !== "undefined" ? globalThis : this,
  function createMonsterPricing() {
    const SCOOP_PRICE = 100;
    const HOSTING_PRICE = 390;

    const plans = {
      base: {
        id: "base",
        name: "Base",
        setup: 4190,
        management: null,
        setupPrefix: "",
        scoops: {
          google: 0,
          meta: 0,
          remarketing: 0,
        },
      },
      performance: {
        id: "performance",
        name: "Performance",
        setup: 6490,
        management: 1190,
        setupPrefix: "",
        scoops: {
          google: 8,
          meta: 5,
          remarketing: 2,
        },
      },
      scale: {
        id: "scale",
        name: "Escala",
        setup: 8490,
        management: 1790,
        setupPrefix: "A partir de ",
        scoops: {
          google: 14,
          meta: 10,
          remarketing: 6,
        },
      },
    };

    function normalizeScoops(scoops) {
      return {
        google: Math.max(0, Number(scoops.google) || 0),
        meta: Math.max(0, Number(scoops.meta) || 0),
        remarketing: Math.max(0, Number(scoops.remarketing) || 0),
      };
    }

    function getPlanQuote(planId, scoopOverride) {
      const plan = plans[planId];

      if (!plan) {
        throw new Error(`Plano desconhecido: ${planId}`);
      }

      const scoops = normalizeScoops(
        scoopOverride || plan.scoops
      );
      const totalScoops =
        scoops.google
        + scoops.meta
        + scoops.remarketing;
      const entry = plan.setup / 2;

      return {
        ...plan,
        scoops,
        totalScoops,
        media: totalScoops * SCOOP_PRICE,
        hosting: HOSTING_PRICE,
        entry,
        remaining: plan.setup - entry,
        initialPayment: entry + HOSTING_PRICE,
      };
    }

    return {
      HOSTING_PRICE,
      SCOOP_PRICE,
      getPlanQuote,
      plans,
    };
  }
);
