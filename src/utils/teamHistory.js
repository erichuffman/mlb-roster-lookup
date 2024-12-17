const currentYear = new Date();
const teamHistory = [
  {
    id: '108',
    roster_start: 1961,
    current_name: 'Angels',
    current_location: 'Los Angeles',
    names: [
      {
        start: 1961,
        end: 1964,
        name: 'Angels',
        location: 'Los Angeles',
      },
      {
        start: 1965,
        end: 1996,
        name: 'Angels',
        location: 'California',
      },
      {
        start: 1997,
        end: 2004,
        name: 'Angels',
        location: 'Anaheim',
      },
      {
        start: 2005,
        end: currentYear.getUTCFullYear(),
        name: 'Angels',
        location: 'Los Angeles',
      }
    ]
  },
  {
    id: '109',
    roster_start: 1998,
    current_name: 'Diamondbacks',
    current_location: 'Arizona',
  },
  {
    id: '117',
    roster_start: 1962,
    current_name: 'Astros',
    current_location: 'Houston',
    names: [
      {
        start: 1962,
        end: 1964,
        name: 'Colt .45s',
        location: 'Houston',
      },
      {
        start: 1965,
        end: currentYear.getUTCFullYear(),
        name: 'Astros',
        location: 'Houston',
      }
    ]
  },
  {
    id: '133',
    roster_start: 1901,
    current_name: 'Athletics',
    current_location: 'Oakland',
    names: [
      {
        start: 1901,
        end: 1954,
        name: 'Athletics',
        location: 'Philadelphia',
      },
      {
        start: 1955,
        end: 1967,
        name: 'Athletics',
        location: 'Kansas City',
      },
      {
        start: 1968,
        end: currentYear.getUTCFullYear(),
        name: 'Athletics',
        location: 'Oakland',
      }
    ]
  },
  {
    id: '135',
    roster_start: 1969,
    current_name: 'Padres',
    current_location: 'San Diego',
  },
  {
    id: '144',
    roster_start: 1871,
    current_name: 'Braves',
    current_location: 'Atlanta',
    names: [
      {
        start: 1871,
        end: 1911,
        name: 'Red Stockings',
        location: 'Boston',
      },
      {
        start: 1912,
        end: 1952,
        name: 'Braves',
        location: 'Boston',
      },
      {
        start: 1953,
        end: 1965,
        name: 'Braves',
        location: 'Milwaukee',
      },
      {
        start: 1966,
        end: currentYear.getUTCFullYear(),
        name: 'Braves',
        location: 'Atlanta',
      }
    ]
  },
  {
    id: '158',
    roster_start: 1969,
    current_name: 'Brewers',
    current_location: 'Milwaukee',
    names: [
      {
        start: 1969,
        end: 1969,
        name: 'Pilots',
        location: 'Seattle',
      },
      {
        start: 1970,
        end: currentYear.getUTCFullYear(),
        name: 'Brewers',
        location: 'Milwaukee',
      }
    ]
  },
  {
    id: '119',
    roster_start: 1884,
    current_name: 'Dodgers',
    current_location: 'Los Angeles',
    names: [
      {
        start: 1884,
        end: 1931,
        name: 'Bridegrooms',
        location: 'Brooklyn',
      },
      {
        start: 1932,
        end: 1957,
        name: 'Dodgers',
        location: 'Brooklyn',
      },
      {
        start: 1958,
        end: currentYear.getUTCFullYear(),
        name: 'Dodgers',
        location: 'Los Angeles',
      }
    ]
  },
  {
    id: '137',
    roster_start: 1883,
    current_name: 'Giants',
    current_location: 'San Francisco',
    names: [
      {
        start: 1883,
        end: 1884,
        name: 'Gothams',
        location: 'New York',
      },
      {
        start: 1885,
        end: 1957,
        name: 'Giants',
        location: 'New York',
      },
      {
        start: 1958,
        end: currentYear.getUTCFullYear(),
        name: 'Giants',
        location: 'San Francisco',
      }
    ]
  },
  {
    id: '114',
    roster_start: 1901,
    current_name: 'Guardians',
    current_location: 'Cleveland',
    names: [
      {
        start: 1901,
        end: 1902,
        name: 'Bluebirds',
        location: 'Cleveland',
      },
      {
        start: 1903,
        end: 1914,
        name: 'Napoleons',
        location: 'Cleveland',
      },
      {
        start: 1915,
        end: 2021,
        name: 'Indians',
        location: 'Cleveland',
      },
      {
        start: 2022,
        end: currentYear.getUTCFullYear(),
        name: 'Guardians',
        location: 'Cleveland',
      }
    ]
  },
  {
    id: '115',
    roster_start: 1993,
    current_name: 'Rockies',
    current_location: 'Colorado',
  },
  {
    id: '146',
    roster_start: 1993,
    current_name: 'Marlins',
    current_location: 'Miami',
    names: [
      {
        start: 1993,
        end: 2011,
        name: 'Marlins',
        location: 'Florida',
      },
      {
        start: 2012,
        end: currentYear.getUTCFullYear(),
        name: 'Marlins',
        location: 'Miami',
      }
    ]
  },
  {
    id: '120',
    roster_start: 1969,
    current_name: 'Nationals',
    current_location: 'Washington, D.C.',
    names: [
      {
        start: 1969,
        end: 2004,
        name: 'Expos',
        location: 'Montreal',
      },
      {
        start: 2005,
        end: currentYear.getUTCFullYear(),
        name: 'Nationals',
        location: 'Washington, D.C.',
      }
    ]
  },
  {
    id: '110',
    roster_start: 1901,
    current_name: 'Orioles',
    current_location: 'Baltimore',
    names: [
      {
        start: 1901,
        end: 1901,
        name: 'Brewers',
        location: 'Milwaukee',
      },
      {
        start: 1902,
        end: 1953,
        name: 'Browns',
        location: 'St. Louis',
      },
      {
        start: 1954,
        end: currentYear.getUTCFullYear(),
        name: 'Orioles',
        location: 'Baltimore',
      }
    ]
  },
  {
    id: '140',
    roster_start: 1961,
    current_name: 'Rangers',
    current_location: 'Texas',
    names: [
      {
        start: 1961,
        end: 1971,
        name: 'Senators',
        location: 'Washington, D.C.',
      },
      {
        start: 1972,
        end: currentYear.getUTCFullYear(),
        name: 'Rangers',
        location: 'Texas',
      }
    ]
  },
  {
    id: '139',
    roster_start: 1998,
    current_name: 'Rays',
    current_location: 'Tampa Bay',
    names: [
      {
        start: 1998,
        end: 2007,
        name: 'Devil Rays',
        location: 'Tampa Bay',
      },
      {
        start: 2008,
        end: currentYear.getUTCFullYear(),
        name: 'Rays',
        location: 'Tampa Bay',
      }
    ]
  },
  {
    id: '142',
    roster_start: 1901,
    current_name: 'Twins',
    current_location: 'Minnesota',
    names: [
      {
        start: 1901,
        end: 1960,
        name: 'Senators',
        location: 'Washington, D.C.',
      },
      {
        start: 1961,
        end: currentYear.getUTCFullYear(),
        name: 'Twins',
        location: 'Minnesota',
      }
    ]
  },
  {
    id: '145',
    roster_start: 1901,
    current_name: 'White Sox',
    current_location: 'Chicago',
    names: [
      {
        start: 1901,
        end: 1903,
        name: 'White Stockings',
        location: 'Chicago',
      },
      {
        start: 1904,
        end: currentYear.getUTCFullYear(),
        name: 'White Sox',
        location: 'Chicago',
      }
    ]
  },
  {
    id: '147',
    roster_start: 1901,
    current_name: 'Yankees',
    current_location: 'New York',
    names: [
      {
        start: 1901,
        end: 1912,
        name: 'Highlanders',
        location: 'New York',
      },
      {
        start: 1913,
        end: currentYear.getUTCFullYear(),
        name: 'Yankees',
        location: 'New York',
      }
    ]
  }
  ,
  {
    id: '138',
    roster_start: 1892,
    current_name: 'Cardinals',
    current_location: 'St. Louis',
    names: [
      {
        start: 1892,
        end: 1899,
        name: 'Browns',
        location: 'St. Louis',
      },
      {
        start: 1900,
        end: currentYear.getUTCFullYear(),
        name: 'Cardinals',
        location: 'St. Louis',
      }
    ]
  }
]

export { teamHistory }
