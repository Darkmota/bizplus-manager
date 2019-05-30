import StringForm from '../component/StringForm'
import ObjectForm from '../component/ObjectForm'
import ListForm from '../component/ListForm'

export default {
  menu_home: StringForm,
  menu_company: StringForm,
  menu_company_info: StringForm,
  menu_company_idea: StringForm,
  menu_company_grop: StringForm,
  menu_company_safe: StringForm,
  menu_business: StringForm,
  menu_business_info: StringForm,
  menu_business_disp: StringForm,
  menu_business_bail: StringForm,
  menu_business_othr: StringForm,
  menu_business_ache: StringForm,
  menu_benefits: StringForm,
  menu_benefits_cult: StringForm,
  menu_benefits_tech: StringForm,
  menu_jobs: StringForm,
  menu_asks: StringForm,
  menu_access: StringForm,
  home_card: {
    _form: ListForm,
    _children: {
      tl: StringForm,
      el: StringForm,
      img: StringForm,
      desc: StringForm
    }
  },
  home_carousels: {
    _form: ListForm,
    _children: {
      imgw: StringForm,
      imgm: StringForm,
      title: StringForm,
      desc: StringForm
    }
  },
  about: {
    about: StringForm,
    summary_title: StringForm,
    summary_desc: StringForm,
    philosophy_title: StringForm,
    philosophy_desc: [StringForm],
    greet_title: StringForm,
    greet_president: StringForm,
    greet_jname: StringForm,
    greet_ename: StringForm,
    greet_list: [StringForm],
    r11t: StringForm,
    r11v: StringForm,
    r12t: StringForm,
    r12v: StringForm,
    r21t: StringForm,
    r21v: StringForm,
    r22t: StringForm,
    r22v: StringForm,
    r31t: StringForm,
    r31v: StringForm,
    r32t: StringForm,
    r32v: StringForm,
    r41t: StringForm,
    r41v: StringForm,
    r42t: StringForm,
    r42v: StringForm,
    r51t: StringForm,
    r51v: StringForm,
    r52t: StringForm,
    r52v: StringForm,
    r61t: StringForm,
    r61v: StringForm,
    r62t: StringForm,
    r62v: StringForm,
    r71t: StringForm,
    r71v: StringForm,
    r81t: StringForm,
    r81v: StringForm,
    r91t: StringForm,
    r91v1: StringForm,
    r91v2: StringForm,
    r91v3: StringForm,
    r91v4: StringForm,
    r91v5: StringForm
  },
  security: {
    part1_title: StringForm,
    part1_list: [StringForm],
    part2_title: StringForm,
    part2_list: [StringForm],
  },
  business: {
    business: StringForm,
    business_title: StringForm,
    dev_title: StringForm,
    con_title: StringForm,
    for_title: StringForm,
    edu_title: StringForm,
    dev_list: [{
      type: Number,
      val: StringForm
    }],
    con_list: [StringForm],
    for_list: [StringForm],
    edu_list: [StringForm],
  },
  foreigner: {
    business: StringForm,
    business_title: StringForm,
    title_main: StringForm,
    title_s1: StringForm
  }
}
