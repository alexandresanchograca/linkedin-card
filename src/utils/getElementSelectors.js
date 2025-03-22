function getSelectors() {
  const selectorData = {
    coverImg: "#profile-background-image-target-image",
    profileImg: "div.ph5 div.display-flex img",
    profileImgName: "div.ph5 div.display-flex img",
    profileAbout:
      "div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words",
    companyDetails: "div.mt2.relative > ul > li",
    experiences: "div.pvs-list__outer-container > ul > li .visually-hidden",
    influencerImg:
      "#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-none.scaffold-layout--main-aside.scaffold-layout--single-column.scaffold-layout--reflow.pv-profile > div > div > main > section.artdeco-card img",
  };

  return btoa(JSON.stringify(selectorData));
}

async function getElementSelectors(user) {
  const textResult = getSelectors();
  const jsonObj = JSON.parse(atob(textResult));

  return jsonObj;
}

export default getElementSelectors;
