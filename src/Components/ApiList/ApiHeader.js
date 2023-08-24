export default function ApiHeader() {
  // let token2 = window.sessionStorage.getItem("loginInfo")?.token;
  let localData = JSON.parse(window.sessionStorage.getItem("loginInfo"));
  let token2 = localData?.token
  console.log('extracted....',token2)
  const header = {
    // timeout: 1,
    timeout: 60000,
    headers: {
      Authorization: `Bearer ${token2}`,
      Accept: "application/json",
    },
  };
  return header;
}
