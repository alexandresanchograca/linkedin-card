function downloadableName(profileName){
   return profileName ? profileName.toLowerCase().replace(/ /g, '-') + "-card.png" : "profile-card.png";
}

export default downloadableName;