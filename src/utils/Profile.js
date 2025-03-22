import getElementSelectors from "@/utils/getElementSelectors.js";

class Profile {
  constructor(doc) {
    this.doc = doc;
    this.coverImg = null;
    this.companyImgTitle = [];
    this.experience = [];
    this.profileImg = null;
    this.profileImgName = null;
    this.profileAbout = null;
    this.influencerImg = null;
    this.isBlankProfileImg = false;
  }

  getElementSrc(selector) {
    const element = this.doc.querySelector(selector);
    return element ? element.src : null;
  }

  getElementTitle(selector) {
    const element = this.doc.querySelector(selector);
    return element ? element.title : null;
  }

  getElementAlt(selector) {
    const element = this.doc.querySelector(selector);
    return element ? element.alt : null;
  }


  getElementInnerText(selector) {
    const element = this.doc.querySelector(selector);
    return element ? element.innerText : null;
  }

  getCompanyDetails(selector) {
    const companies = this.doc.querySelectorAll(selector);
    companies.forEach((company) => {
      const img = company.querySelector("img");
      const div = company.querySelector("div");
      if (img && div) {
        this.companyImgTitle.push({ img_url: img.src, name: div.innerText });
      }
    });
  }

  getExperiences(selector) {
    const experiences = this.doc.querySelectorAll(selector);
    experiences.forEach((experience) => {
      this.experience.push(experience.innerText);
    });
  }

  async scrape(user) {
    const selectors = await getElementSelectors(user);

    this.coverImg = this.getElementSrc(selectors.coverImg);
    this.profileImg = this.getElementSrc(selectors.profileImg);
    this.profileImgName = this.getElementAlt(selectors.profileImgName);
    this.profileAbout = this.getElementInnerText(selectors.profileAbout);
    this.getCompanyDetails(selectors.companyDetails);
    this.getExperiences(selectors.experiences);
    this.influencerImg = this.getElementSrc(selectors.influencerImg);

    //Handle elements the scraper couldn't retrieve
    this.replaceBlanks();
  }

  replaceBlanks(){
   if (!this.coverImg) {
     this.coverImg = require("../assets/placeholder.jpeg");
   }

   if(!this.profileImg) {
     this.isBlankProfileImg = true;
     this.profileImg = require("../assets/profileplaceholder.jpeg");
   }
  }
}

export default Profile;
