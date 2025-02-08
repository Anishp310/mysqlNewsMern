const backendDomain = "http://localhost:8080";

const SummaryApi = {
  // Auth
  RegisterApi: {
    url: `${backendDomain}/register`,
    method: "POST",
  },
  LoginApi: {
    url: `${backendDomain}/login`,
    method: "POST",
  },

  // National News
  getAllNational: {
    url: `${backendDomain}/getAllNational`,
    method: "GET",
  },
  getNational: {
    url: `${backendDomain}/getNational`,
    method: "GET",
  },
  updateNational: {
    url: `${backendDomain}/updateNational`,
    method: "PUT",
  },
  addNational: {
    url: `${backendDomain}/national`,
    method: "POST",
  },
  deleteNational: {
    url: `${backendDomain}/deleteNational`,
    method: "DELETE",
  },

  // International News
  getAllInternational: {
    url: `${backendDomain}/getAllinternational`,
    method: "GET",
  },
  getInternational: {
    url: `${backendDomain}/getinternational`,
    method: "GET",
  },
  updateInternational: {
    url: `${backendDomain}/updateinternational`,
    method: "PUT",
  },
  addInternational: {
    url: `${backendDomain}/international`,
    method: "POST",
  },
  deleteInternational: {
    url: `${backendDomain}/deleteinternational`,
    method: "DELETE",
  },

  // Ads
  getAllAds: {
    url: `${backendDomain}/getAllads`,
    method: "GET",
  },
  getAds: {
    url: `${backendDomain}/getads`,
    method: "GET",
  },
  updateAds: {
    url: `${backendDomain}/updateads`,
    method: "PUT",
  },
  addAds: {
    url: `${backendDomain}/ads`,
    method: "POST",
  },
  deleteAds: {
    url: `${backendDomain}/deleteads`,
    method: "DELETE",
  },

  // Economics
  getAllEconomics: {
    url: `${backendDomain}/getAlleconomic`,
    method: "GET",
  },
  getEconomic: {
    url: `${backendDomain}/geteconomic`,
    method: "GET",
  },
  updateEconomic: {
    url: `${backendDomain}/updateeconomic`,
    method: "PUT",
  },
  addEconomic: {
    url: `${backendDomain}/economic`,
    method: "POST",
  },
  deleteEconomic: {
    url: `${backendDomain}/deleteeconomic`,
    method: "DELETE",
  },

  // Entertainment
  getAllEntertainment: {
    url: `${backendDomain}/getAllentertainment`,
    method: "GET",
  },
  getEntertainment: {
    url: `${backendDomain}/getentertainment`,
    method: "GET",
  },
  updateEntertainment: {
    url: `${backendDomain}/updateentertainment`,
    method: "PUT",
  },
  addEntertainment: {
    url: `${backendDomain}/entertainment`,
    method: "POST",
  },
  deleteEntertainment: {
    url: `${backendDomain}/deleteentertainment`,
    method: "DELETE",
  },

  // Information
  getAllInformation: {
    url: `${backendDomain}/getAllinformation`,
    method: "GET",
  },
  getInformation: {
    url: `${backendDomain}/getinformation`,
    method: "GET",
  },
  updateInformation: {
    url: `${backendDomain}/updateinformation`,
    method: "PUT",
  },
  addInformation: {
    url: `${backendDomain}/information`,
    method: "POST",
  },
  deleteInformation: {
    url: `${backendDomain}/deleteinformation`,
    method: "DELETE",
  },

  // Others
  getAllOthers: {
    url: `${backendDomain}/getAllothers`,
    method: "GET",
  },
  getOthers: {
    url: `${backendDomain}/getothers`,
    method: "GET",
  },
  updateOthers: {
    url: `${backendDomain}/updateothers`,
    method: "PUT",
  },
  addOthers: {
    url: `${backendDomain}/others`,
    method: "POST",
  },
  deleteOthers: {
    url: `${backendDomain}/deleteothers`,
    method: "DELETE",
  },

  // Sports
  getAllSports: {
    url: `${backendDomain}/getAllsports`,
    method: "GET",
  },
  getSports: {
    url: `${backendDomain}/getsports`,
    method: "GET",
  },
  updateSports: {
    url: `${backendDomain}/updatesports`,
    method: "PUT",
  },
  addSports: {
    url: `${backendDomain}/sports`,
    method: "POST",
  },
  deleteSports: {
    url: `${backendDomain}/deletesports`,
    method: "DELETE",
  },



   // Images
   createImage: {
    url: `${backendDomain}/image`,
    method: "POST",
  },
  getAllImages: {
    url: `${backendDomain}/getAllImages`,
    method: "GET",
  },
  getImage: {
    url: `${backendDomain}/getImage/:image_id`,
    method: "GET",
  },
  updateImage: {
    url: `${backendDomain}/updateImage`,
    method: "PUT",
  },
  deleteImage: {
    url: `${backendDomain}/deleteImage`,
    method: "DELETE",
  },
  deleteAllImages: {
    url: `${backendDomain}/deleteAllImages`,
    method: "DELETE",
  },
};

export default SummaryApi;
