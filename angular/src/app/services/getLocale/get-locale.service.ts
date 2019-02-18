import { Injectable } from '@angular/core';

@Injectable()
export class GetLocaleService {

  currStr = {}

  enLocale = {
    vid : "One minute introductory video",
    eduTab : "Education",
    expTab : "Experience",
    prjTab : "Projects",
    sklTab : "Skills",
    certTab : "Certification",
    intrstTab : "Interests",
    shrtlstBtn : "Shortlist",
    interqBtn : "Request Interview",
    edu_lteduMark : "This icon represents latest education.",
    edu_scl : "School Name",
    edu_mjr : "Degree And Major/Field Of Study",
    edu_grd : "Grade/CGPI/percentage",
    edu_drtion : "Duration",
    prj_ttl : "Request Interview",
    prj_descrip : "Request Interview",
    prj_tmSz : "Team size",
    prj_rspbl : "Responsibilities",
    prj_drtion : "Duration",
    prk_skls : "Used Skills",
    skl_cmptLanguages : "computer languages",
    skl_exprt : "Industry Knowledge/Expertise",
    skl_spknLang : "Spoken languages",
    cert_title : "Title",
    cert_lnk : "Link to certificate",
    intrst_hbies : "Hobbies and professional interests",
    intrst_mtvation : "Motivation To Come To Japan"
  }

  jpLocale = {
    vid : "1分間の紹介ビデオ",
    eduTab : "学歴",
    expTab : "就業経験",
    prjTab : "プロジェクト",
    sklTab : "スキル",
    certTab : "資格",
    intrstTab : "関心",
    shrtlstBtn : "ショートリスト",
    interqBtn : "インタビューを依頼",
    edu_lteduMark : "最終学歴にはこのアイコンが表示されます。",
    edu_scl : "教育機関名",
    edu_mjr : "専攻科目",
    edu_grd : "成績",
    edu_drtion : "期間",
    prj_ttl : "インタビューを依頼",
    prj_descrip : "インタビューを依頼",
    prj_tmSz : "プロジェクト人数",
    prj_rspbl : "自身の役割",
    prj_drtion : "期間",
    prk_skls : "使用スキル",
    skl_cmptLanguages : "開発言語",
    skl_exprt : "得意分野",
    skl_spknLang : "言語",
    cert_title : "資格名",
    cert_lnk : "リンク",
    intrst_hbies : "趣味",
    intrst_mtvation : "日本での就業を希望する理由"
  }

  constructor() {
   }

  getLocale(locale: string){
    if(locale == 'EN') this.currStr = this.enLocale;
    else this.currStr = this.jpLocale;
    /*let fileUrl = this.apiUrl + `assets/locale/CVPage_${locale}.json`;
    return this.http.get(fileUrl).map(res => res.json());*/
  }
}
