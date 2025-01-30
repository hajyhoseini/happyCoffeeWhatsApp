module.exports = {
    async rewrites() {
      return [
        {
          source: '/login',
          destination: '/usage/login',
        },
        {
          source: '/register',
          destination: '/usage/register',
        },
        {
          source: '/forget',
          destination: '/usage/forget',
        },
      ];
    },
  };
  