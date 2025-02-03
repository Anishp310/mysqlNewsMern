const backendDomain = "http://localhost:8080";

const SummaryApi = {
//  Auth 
RegisterApi :{
  url: `${backendDomain}/register`,
  method:'POST'
},
LoginApi :{
  url: `${backendDomain}/login`,
  method:'POST'
},

//national news
  getAllNational: {
    url: `${backendDomain}/getAllNational`,
    method: "get",
  },
  getNational: {
    url: `${backendDomain}/getNational`,
    method: "get",
  },
  updateNational: {
    url: `${backendDomain}/updateNational`,
    method: "put",
  },
  addNational: {
    url: `${backendDomain}/national`,
    method: "post",
  },
  deleteNational: {
    url: `${backendDomain}/deleteNational`,
    method: "delete",
  },
 
}
export default SummaryApi