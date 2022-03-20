const resolvers = {
  Query: {
    // get all tracks, will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },

  Mutation: {
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (error) {
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
          track: null
        }
      }
    },
  },

  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};

module.exports = resolvers;

// QUERY
// using fetch instead of dataSources
// tracksForHomeFetch: async () => {
//     const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
//     const res = await fetch(`${baseUrl}/tracks`);
//     return res.json();
// }

// TRACK
// using fetch instead of dataSources
// author: async ({ authorId }, _, { dataSources }) => {
//     const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
//     const res = await fetch(`${baseUrl}/author/${authorId}`);
//     return res.json();
//     // return dataSources.trackAPI.getAuthor(authorId);
// },
