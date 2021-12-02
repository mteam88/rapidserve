function Authorize(googleUser) {
  var profile = googleUser.getBasicProfile();
  var userInfo = {ID:profile.getId(),Full_Name:profile.getName(),Given_Name:profile.getGivenName(),Family_Name:profile.getFamilyName(),Image_URL:profile.getImageUrl(),Email:profile.getEmail(),ID_token:googleUser.getAuthResponse().id_token};
  if (userInfo.Email.includes("@inst.hcpss.org")) {
    return {statusCode:200};
  } else {
    return {statusCode:1};
  }
}