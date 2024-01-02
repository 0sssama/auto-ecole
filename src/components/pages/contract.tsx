import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface ContractProps {
  date: string;
  city: string;
  licenseFile: { id: string; category: string; practiceHours: string; theoryHours: string };
  school: {
    name: string;
    numRegistrePermis: string;
    address: string;
    numRegistreTax: string;
    numRegistreCommerce: string;
    city: string;
    fax: string;
    phone: string;
    email: string;
  };
  student: { cin: string; birthdate: string; birthplace: string; address: string; numReferenceWeb: string };
}

export default function Contract({
  date,
  city,
  licenseFile: { id, category, practiceHours, theoryHours },
  school: {
    name,
    numRegistrePermis,
    address: schoolAddress,
    numRegistreTax,
    numRegistreCommerce,
    city: schoolCity,
    fax,
    phone,
    email,
  },
  student: { cin, birthdate, birthplace, address: studentAddress, numReferenceWeb },
}: ContractProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>عقد التكوين بين المرشح ومؤسسة تعليم السياقة</Text>
          <Text style={styles.pageTitle}>
            رخصة السياقة من صنف <b>{`"${category}"`}</b>
          </Text>
        </View>
        <View style={styles.dateTimeSection}>
          <Text style={styles.flex1Centered}>
            رقم : <b>{id}</b>
          </Text>
          <Text style={styles.flex1Centered}>
            بتاريخ : <b>{date}</b>
          </Text>
        </View>
        <View style={styles.partiesSection}>
          <Text style={styles.largeTitle}>طرفي العقد</Text>
          <View style={styles.schoolPartySection}>
            <Text style={styles.largeText}>هذا العقد مبرم بين :</Text>
            <View style={styles.informationContainer}>
              <Text>
                مؤسسة تعليم السياقة : <b>{name}</b>
              </Text>
              <Text>
                رقم القيد في السجل الوطني الخاص بمؤسسات تعليم السياقة (رقم الرخصة) : <b>{numRegistrePermis}</b>
              </Text>
              <Text>
                العنوان : <b>{schoolAddress}</b>
              </Text>
              <Text>
                رقم القيد في سجل الضريبة المهنية : <b>{numRegistreTax}</b>
              </Text>
              <View style={styles.flexFullWidth}>
                <Text style={styles.flex1}>
                  رقم القيد في السجل التجاري: <b>{numRegistreCommerce}</b>
                </Text>
                <Text style={styles.flex1}>
                  المدينة : <b>{schoolCity}</b>
                </Text>
              </View>
              <View style={styles.flexFullWidth}>
                <Text style={styles.flex1}>
                  الهاتف : <b>{phone}</b>
                </Text>
                <Text style={styles.flex1}>
                  الفاكس : <b>{fax}</b>
                </Text>
              </View>
              <Text>
                البريد الإلكتروني : <b>{email}</b>
              </Text>
              <Text style={styles.largeText}>المسماة "المؤسسة "</Text>
            </View>
          </View>
          <View style={styles.studentPartySection}>
            <Text style={styles.largeText}>والسيد (ة) :</Text>
            <View style={styles.informationContainer}>
              <View style={styles.flexFullWidth}>
                <Text style={styles.flex1}>
                  رقم ب.و.ت.إ : <b>{cin}</b>
                </Text>
                <Text style={styles.flex1}>
                  المزداد(ة) ب: <b>{birthplace}</b>
                </Text>
                <Text style={styles.flex1}>
                  بتاريخ : <b>{birthdate}</b>
                </Text>
              </View>
              <Text>
                القاطن (ة) ب : <b>{studentAddress}</b>
              </Text>
              <Text>
                رقم تسجيل المرشح الممنوح من طرف الإدارة (Web Référence) : <b>{numReferenceWeb}</b>
              </Text>
              <Text style={styles.largeText}>المسمى(ة) "المرشح (ة)"</Text>
            </View>
          </View>
        </View>
        <View style={styles.flexColCentered}>
          <View style={styles.flexColCentered}>
            <Text style={styles.largeTitleCentered}>اتفـــــــق الطرفـــــــان علـــــى ما يلــــــي</Text>
            <View style={styles.conditionsContainer}>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة الأولـــى : موضوع العقد</Text>
                <Text>
                  يهدف هذا العقد إلى تكوين المرشح وتمكينه من اكتساب المعارف والمهارات الضرورية الالزمة التي تمكنه من
                  سياقة مركبة تتطلب قيادتها رخصة السياقة من صنف <b>{`"${category}"`}</b>، طبقا للبرامج المحددة من طرف
                  الإدارة.
                  <br /> كما يحدد حقوق وواجبات كال الطرفين مع مراعاة القوانين والأنظمة الجاري بها العمل في هذا الشأن.
                </Text>
              </View>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة 2 : مدة العقد</Text>
                <Text>
                  يمتد هذا العقد لمدة ستة أشهر ابتداء من تاريخ توقيعه. ويمكن تمديده، في حالة التفاق بين الطرفين، لمدة لا
                  تتعدى ثلاثة أشهر.
                </Text>
              </View>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة 3 : التزامات المؤسسة</Text>
                <Text>
                  تلتزم المؤسسة بتكوين المرشح طبقا للبرنامج الوطني لتعليم السياقة.
                  <br />
                  تلقن الدروس النظرية والتطبيقية، تحت إشراف مدير المؤسسة، من طرف مدرب أو مدربي تعليم السياقة مرخص لهم،
                  تشغلهم المؤسسة لهذا الغرض وبواسطة مركبات لتعليم السياقة في ملكيتها.
                  <br />
                  تلتزم المؤسسة بتوفير المركبة التي يتم بواسطتها إجراء الإختبار التطبيقي.
                  <br />
                  لا يمكن الشروع في التكوين النظري إلا بعد حصول المرشح على رقم التسجيل الممنوح له من طرف الإدارة.
                  <br />
                  تلتزم المؤسسة بإخبار المرشح فورا بحصوله على هذا الرقم، كما تلتزم بتسليم المرشح شهادة نهاية التكوين فور
                  إنهائه له.
                  <br />
                  تحتفظ المؤسسة بحق إرجاء دروس التكوين إلى تاريخ الحق في حالة قوة قاهرة وفي كل الحالات التي تكون فيه
                  السلامة غير متوفرة.
                  <br /> بعد استفادة المرشح من عدد ساعات التكوين النظري والتطبيقي المتفق عليها، تلتزم المؤسسة بتقديمه
                  الإمتحانات لنيل رخصة السياقة في حدود المقاعد الممنوحة من طرف الإدارة.
                </Text>
              </View>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة 4 : التزامات المرشح</Text>
                <Text>
                  إذا توقف المرشح عن التكوين، سواء بصفة مؤقتة أو نهائية، وكيفما كانت الأسباب، يلتزم بإخبار المؤسسة
                  كتابيا، في حالة التوقف لأكثر من ثلاثة (3) أشهر متتالية، يحق للمؤسسة مطالبة المرشح بأداء مبالغ الخدمات
                  المتبقية، وغير المؤداة ؛
                  <br />
                  إذا انقطع المرشح عن التكوين لمدة تفوق ستة (6) أشهر، يعتبر متخليا عن التكوين ولا يحق له أن يسترجع ما
                  دفعه من أجله.
                  <br /> إذا تخلى المرشح عن التكوين لسبب يعود له، يؤدي التعريفة كاملـة.
                  <br /> في حالة عدم النجاح في الإمتحان، يلتزم المرشح بأداء مصاريف إعادة تكوينه وفقا لنفس التعريفة.
                </Text>
              </View>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة 5 : مدة التكوين</Text>
                <Text>
                  إتفق الطرفان على تحديد عدد ساعات التكوين في <b>{theoryHours}</b> ساعة بالنسبة للتكوين النظري و{' '}
                  <b>{practiceHours}</b> ساعة بالنسبة للتكوين التطبيقي. لا يقل هذا العدد عن العدد الأدنى المحدد بالمادة
                  32 من دفتر التحمالت الخاص بفتح واستغلال مؤسسات تعليم السياقة.
                </Text>
              </View>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة 6 : تعريفة التكوين</Text>
                <Text>
                  تحتسب التعريفة الإجمالية للتكوين على أساس تعريفة ساعة التكوين النظري والتطبيقي المحددة في المادة 1 من
                  القرار الذي يحدد تعريفة ساعة التكوين النظري والتطبيقي.
                </Text>
              </View>
              <View style={styles.condition}>
                <Text style={styles.largeTextBold}>المادة 7 : كيفيات الأداء</Text>
                <Text>
                  تسلم للمرشح فاتورة تحدد المبالغ المدفوعة للمؤسسة. تكون هذه الفاتورة مؤرخة وموقعة من طرف صاحب المؤسسة
                  تحمل هذه الفاتورة اسم وطابع المؤسسة، وفقا للتشريعات الجاري بها العمل. في حالة الإتفاق بين الطرفين،
                  يمكن أداء مبلغ التكوين على أقساط.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.flexCenteredText}>
            <Text>عقد محرر في ثلاثة نظائر أصلية،</Text>
            <Text>
              في <b>{city}</b> بتاريخ، <b>{date}</b>
            </Text>
          </View>
          <View style={styles.flexWithGap}>
            <Text style={styles.flex1CenteredBold}>توقيع صاحب المؤسسة أو ممثله القانوني</Text>
            <Text style={styles.flex1CenteredBold}>توقيع المرشح أو ولي أمره مصادق عليه</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '16px',
  },
  pageTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  flexColCentered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleSection: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  dateTimeSection: {
    display: 'flex',
    width: '100%',
    paddingTop: '40px',
  },
  partiesSection: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '8px',
    paddingTop: '40px',
  },
  largeTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  largeTitleCentered: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  schoolPartySection: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '12px',
  },
  studentPartySection: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  largeText: {
    fontSize: '20px',
    marginBottom: '6px',
  },
  largeTextBold: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '12px',
    paddingRight: '12px',
    gap: '4px',
  },
  flexFullWidth: {
    display: 'flex',
    width: '100%',
  },
  flex1: {
    flex: 1,
  },
  flex1Centered: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  flex1CenteredBold: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  conditionsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '16px',
  },
  condition: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  flexWithGap: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    marginBottom: '120px',
  },
  flexCenteredText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '40px',
  },
});
