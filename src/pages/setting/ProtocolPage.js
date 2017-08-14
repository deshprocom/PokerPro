/**
 * Created by lorne on 2017/8/14.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, SecurityText} from '../../components';


export default class ProtocolPage extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title={I18n.t('protocol1')}
                rightBtnText={I18n.t('agree')}
                rightBtnPress={() => {
                    this.props.params._protocol();
                    router.pop();
                }}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>
            <ScrollView>
                {language === 'zh' ? <Text style={{margin: 20}}>
                    {'\n'}《 扑客APP服务使用协议 》{'\n'}
                    {'\n'}1. 特别提示
                    {'\n'}{'\n'}1.1
                    深圳德尚全彩体育文化有限公司及相关关联企业（以下合称"扑客平台"）同意按照本协议的规定及其不时发布的操作规则提供基于移动网的扑客APP服务（以下称"APP服务"），为获得APP服务，APP服务使用人（以下称"用户"）应当基于了解本协议全部内容，在独立思考的基础上认可、同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击"同意"
                    按钮即表示用户完全接受《扑客网络服务使用协议》、《APP服务使用协议》、《APP社区公约（试行）》及扑客平台公示的各项规则、规范。
                    {'\n\n'}1.2
                    用户注册成功后，扑客平台将为用户基于APP服务使用的客观需要而在申请、注册APP服务时，按照注册要求提供的帐号开通APP服务，用户有权在扑客平台为其开通、并同意向其提供服务的基础上使用APP服务。该用户帐号和密码由用户负责保管；用户使用APP服务过程中，须对自身使用APP服务的行为，对任何由用户通过APP服务服务发布、公开的信息，及对由此产生的任何后果承担全部责任。用户提交、发布或显示的信息将对其他APP服务用户及第三方服务及网站可见(用户可通过设置功能自行控制、把握可查阅其信息的帐号类型)。
                    {'\n\n'}1.3 为提高用户的APP服务使用感受和满意度，用户同意扑客平台将基于用户的操作行为对用户数据进行调查研究和分析，从而进一步优化APP服务。
                    {'\n'}{'\n'}2. 服务内容
                    {'\n'}{'\n'}2.1
                    APP服务的具体内容由扑客平台根据实际情况提供，包括但不限于授权用户通过其帐号，使用APP服务发布观点、评论、图片等，扑客平台有权对其提供的服务或产品形态进行升级或其他调整，并将及时更新页面/告知用户。

                    {'\n'}{'\n'}2.2
                    扑客平台提供的部分网络服务为收费的网络服务，用户使用收费网络服务需要向扑客平台支付一定的费用。对于收费的网络服务，扑客平台会在用户使用之前给予用户明确的提示，只有用户根据提示确认其愿意支付相关费用，用户才能使用该等收费网络服务。如用户拒绝支付相关费用，则扑客平台有权不向用户提供该等收费网络服务。

                    {'\n'}{'\n'}2.3
                    用户理解，扑客平台仅提供与APP服务相关的技术服务等，除此之外与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由用户自行负担。
                    {'\n'}{'\n'}3. 服务变更、中断或终止

                    {'\n'}{'\n'}3.1
                    鉴于网络服务的特殊性（包括但不限于服务器的稳定性问题、恶意的网络攻击等行为的存在及其他扑客平台无法控制的情形），用户同意扑客平台有权随时中断或终止部分或全部的APP服务（包括收费网络服务），若发生该等中断或中止APP服务的情形，扑客平台将尽可能及时通过系统通知、私信、短信提醒或其他合理方式通知受到影响的用户。如中断或终止的APP服务属于收费服务，扑客平台将该用户剩余虚拟货币退还用户的虚拟货币账户或向受影响的用户提供等值的替代性的收费网络服务。

                    {'\n'}{'\n'}3.2
                    用户理解，扑客平台需要定期或不定期地对提供APP服务的平台（移动网络等）或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，扑客平台无需为此承担任何责任，但扑客平台应尽可能事先进行通告。

                    {'\n'}{'\n'}3.3 如发生下列任何一种情形，扑客平台有权随时中断或终止向用户提供本协议项下的APP服务（包括收费服务）而无需对用户或任何第三方承担任何责任：
                    {'\n'}3.3.1 用户提供的个人资料不真实；
                    {'\n'}3.3.2 用户违反法律法规国家政策或本协议中规定的使用规则；
                    {'\n'}3.3.3 用户在使用收费服务时未按规定为其所使用的收费服务实现支付目的。

                    {'\n'}{'\n'}3.4 如用户在申请开通APP服务后在任何连续90日内未实际使用，则扑客平台有权选择采取以下任何一种方式进行处理：
                    {'\n'}3.4.1 回收用户昵称；
                    {'\n'}3.4.2 回收用户账号，或停止为该用户提供APP服务。

                    {'\n'}{'\n'}3.5
                    用户选择将APP帐号与APP合作的第三方帐号进行绑定的，除用户自行解除绑定关系外，如发生下列任何一种情形，用户已绑定的第三方帐号也有可能被解除绑定而扑客平台无需对用户或任何第三方承担任何责任：
                    {'\n'}3.5.1 用户违反法律法规国家政策、本协议或《扑客APP服务使用协议》 的；
                    {'\n'}3.5.2 用户违反第三方帐户用户协议或其相关规定的；
                    {'\n'}3.5.3 其他需要解除绑定的。
                    {'\n'}{'\n'}4. 使用规则

                    {'\n'}{'\n'}4.1
                    用户注册APP账号，制作、发布、传播信息内容的，应当使用真实身份信息及个人资料，不得以虚假、冒用的居民身份信息、企业注册信息、组织机构代码信息进行注册；若用户的个人资料有任何变动，用户应及时更新。

                    {'\n'}{'\n'}4.2 用户可自行编辑注册信息中的账号名称、头像、简介等，但应遵守“七条底线”以及相关管理规定，不得含有违法和不良信息。

                    {'\n'}{'\n'}4.3
                    如用户违反前述约定，依据相关法律、法规及国家政策要求，扑客平台有权随时采取不予注册、通知限期改正、注销登记用户账号、中止或终止用户对APP服务的使用等措施。如果用户冒用、关联机构或社会名人注册账号名称，扑客平台有权注销用户该账号，并向互联网信息内容主管部门报告。

                    {'\n'}{'\n'}4.4 扑客平台将建立健全用户信息安全管理制度、落实技术安全防控措施。扑客平台将对用户使用APP服务过程中涉及的用户隐私内容加以保护。

                    {'\n'}{'\n'}4.5
                    由于APP服务的存在前提是用户在申请开通APP服务的过程中所提供的帐号，则用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号或APP服务遭他人非法使用，应立即通知扑客平台。因黑客行为或用户的保管疏忽导致帐号、密码及APP服务遭他人非法使用，扑客平台有权拒绝承担任何责任。

                    {'\n'}{'\n'}4.6
                    用户同意扑客平台在提供APP服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息，并且，用户同意接受扑客平台通过电子邮件或其他方式向用户发送商品促销或其他相关商业信息。

                    {'\n'}{'\n'}4.7 用户知悉、理解并同意授权扑客平台及其关联公司可非独家、可转授权地使用用户通过APP发布的内容，前述内容包括但不限于文字、图片、视频等。

                    {'\n'}{'\n'}4.8 用户在使用APP服务的过程中应文明发言，并依法尊重其它用户的人格权与身份权等人身权利，共同建立和谐、文明、礼貌的网络社交环境。

                    {'\n'}{'\n'}4.9 用户在使用APP服务过程中，必须遵循以下原则：
                    {'\n'}4.9.1 不得违反中华人民共和国法律法规及相关国际条约或规则；
                    {'\n'}4.9.2 不得违反与网络服务、APP服务有关的网络协议、规定、程序及行业规则；
                    {'\n'}4.9.3 不得违反法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求；
                    {'\n'}4.9.4 不得进行任何可能对互联网或移动网正常运转造成不利影响的行为；
                    {'\n'}4.9.5 不得上传、展示或传播任何不实虚假、冒充性的、骚扰性的、中伤性的、攻击性的、辱骂性的、恐吓性的、种族歧视性的、诽谤诋毁、泄露隐私、成人情色、恶意抄袭的或其他任何非法的信息资料；
                    {'\n'}4.9.6 不得以任何方式侵犯其他任何人依法享有的专利权、著作权、商标权等知识产权，或姓名权、名称权、名誉权、荣誉权、肖像权、隐私权等人身权益，或其他任何合法权益；
                    {'\n'}4.9.7 不得以任何形式侵犯新浪或APP公司的权利和/或利益或作出任何不利于扑客平台的行为；
                    {'\n'}4.9.8 不得从事其他任何影响APP平台正常运营、破坏APP平台经营模式或其他有害APP平台生态的行为。
                    {'\n'}4.9.9 不得为其他任何非法目的而使用APP服务。

                    {'\n'}{'\n'}4.10
                    扑客平台针对某些特定的APP服务的使用通过各种方式（包括但不限于系统通知、私信、短信提醒等）作出的任何声明、通知、警示等内容视为本协议的一部分，用户如使用该等APP服务，视为用户同意该等声明、通知、警示的内容。

                    {'\n'}{'\n'}4.11
                    扑客平台有权对用户使用APP服务的行为及信息进行审查、监督及处理，包括但不限于用户信息（账号信息、个人信息等）、发布内容（位置、文字、图片、音频、视频、商标、专利、出版物等）、用户行为（构建关系、@信息、评论、私信、参与话题、参与活动、营销信息发布、举报投诉等）等范畴。如APP公司发现、或收到第三方举报或投诉用户在使用APP服务时违反本协议第四条使用规则相关规定，扑客平台或其授权的主体有权依据其合理判断要求用户：
                    {'\n'}a. 限期改正;
                    {'\n'}b.
                    {'\n'}不经通知直接采取一切必要措施以减轻或消除用户不当行为造成的影响，并将尽可能在处理之后对用户进行通知。上述必要措施包括但不限于更改、屏蔽或删除相关内容，警告违规账号，限制或禁止违规账号部分或全部功能，暂停、终止、注销用户使用APP服务的权利等。

                    {'\n'}{'\n'}4.12 如用户在使用APP服务的过程中遇到其它用户上传违法侵权等内容，可直接点击"举报"按键进行举报，相关人员会尽快核实并进行处理；
                    {'\n'}如涉及姓名权、名称权、名誉权、荣誉权、肖像权、隐私权等人身权益纠纷的处理，根据《最高人民法院关于审理利用信息网络侵害人身权益民事纠纷案件适用法律若干问题的规定》，请参照站方有关公告所公示的方式进行处理；
                    {'\n'}如用户认为上述方法无法解决遇到的问题、或用户觉得有必要向司法行政机关寻求帮助的，请用户尽快向相关机关反馈，扑客平台将依法配合司法机关的调查取证工作。
                    {'\n'}{'\n'}5. 知识产权

                    {'\n'}5.1扑客平台是APP平台的所有权及知识产权权利人。

                    {'\n'}{'\n'}5.2
                    扑客平台是APP平台产品的所有权及知识产权权利人。上述APP产品指的是扑客平台、或其关联公司、或其授权主体等通过APP平台为用户提供的包括但不限于信息发布分享、关系链拓展、便捷辅助工具、平台应用程序、公众开放平台等功能、软件、服务等。

                    {'\n'}{'\n'}5.3
                    扑客平台是APP平台及APP产品中所有信息内容的所有权及知识产权权利人。前述信息内容包括但不限于程序代码、界面设计、版面框架、数据资料、账号、文字、图片、图形、图表、音频、视频等，除按照法律法规规定应由相关权利人享有权利的内容以外。

                    {'\n'}{'\n'}5.4
                    用户在使用APP平台的过程中，可能会使用到由第三方针对APP服务开发的在APP平台运行的功能、软件或服务，用户除遵守本协议相关规定以外，还应遵守第三方相关规定，并尊重第三方权利人对其功能、软件、服务及其所包含内容的相关权利。

                    {'\n'}{'\n'}5.5 鉴于以上，用户理解并同意：
                    {'\n'}5.5.1 未经扑客平台及相关权利人同意，用户不得对上述功能、软件、服务进行反向工程 （reverse
                    {'\n'}engineer）、反向编译（decompile）或反汇编（disassemble）等；同时，不得将上述内容或资料在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者用于其他任何目的。
                    {'\n'}5.5.2 在尽商业上的合理努力的前提下，扑客平台并不就上述功能、软件、服务及其所包含内容的延误、不准确、错误、遗漏或由此产生的任何损害，以任何形式向用户或任何第三方承担任何责任；

                    {'\n'}5.5.3
                    扑客平台并不对上述任何由第三方提供的功能、软件、服务或内容进行任何保证性的、或连带性的承诺或担保，由此产生的任何纠纷、争议或损害，由用户与第三方自行解决，扑客平台不承担任何责任；
                    {'\n'}5.5.4 为更好地维护APP生态，扑客平台保留在任何时间内以任何方式处置上述由扑客平台享受所有权及知识产权的产品或内容，包括但不限于修订、屏蔽、删除或其他任何法律法规允许的处置方式。
                    {'\n'}{'\n'}6. 隐私保护

                    {'\n'}6.1
                    本协议所指的“隐私”包括《电信和互联网用户个人信息保护规定》第4条关于个人信息、《最高人民法院关于审理利用信息网络侵害人身权益民事纠纷案件适用法律若干问题的规定》第12条关于个人隐私、以及未来不时制定或修订的法律法规中明确规定的隐私应包括的内容。

                    {'\n'}{'\n'}6.2
                    保护用户隐私和其他个人信息是扑客平台的一项基本政策，扑客平台保证不会将单个用户的注册资料及用户在使用APP服务时存储在扑客平台的非公开内容用于任何非法的用途，且保证将单个用户的注册资料进行商业上的利用时应事先获得用户的同意，但下列情况除外：
                    {'\n'}6.2.1 事先获得用户的明确授权；
                    {'\n'}6.2.2 为维护社会公共利益；
                    {'\n'}6.2.3 学校、科研机构等基于公共利益为学术研究或统计的目的，经自然人用户书面同意，且公开方式不足以识别特定自然人；
                    {'\n'}6.2.4 用户自行在网络上公开的信息或其他已合法公开的个人信息；
                    {'\n'}6.2.5 以合法渠道获取的个人信息；
                    {'\n'}6.2.6 用户侵害APP或扑客平台合法权益，为维护前述合法权益且在必要范围内；
                    {'\n'}6.2.7 根据相关政府主管部门的要求；
                    {'\n'}6.2.8 根据相关法律法规或政策的要求；
                    {'\n'}6.2.9 其他必要情况。

                    {'\n'} {'\n'}6.3
                    为提升APP服务的质量，扑客平台可能会与第三方合作共同向用户提供相关的APP服务，此类合作可能需要包括但不限于APP用户数据与第三方用户数据的互通。在此情况下，用户知晓并同意如该第三方同意承担与扑客平台同等的保护用户隐私的责任，则扑客平台有权将用户的注册资料等提供给该第三方，并与第三方约定用户数据仅为双方合作的APP服务之目的使用；并且，扑客平台将对该等第三方使用用户数据的行为进行监督和管理，尽一切合理努力保护用户个人信息的安全性。
                    {'\n'}{'\n'}7. 免责声明

                    {'\n'}7.1 用户在使用APP服务的过程中应遵守国家法律法规及政策规定，因其使用APP服务而产生的行为后果由用户自行承担。

                    {'\n'}{'\n'}7.2
                    通过APP服务发布的任何信息，及通过APP服务传递的任何观点不代表扑客平台之立场，扑客平台亦不对其完整性、真实性、准确性或可靠性负责。用户对于可能会接触到的非法的、非道德的、错误的或存在其他失宜之处的信息，及被错误归类或是带有欺骗性的发布内容，应自行做出判断。在任何情况下，对于任何信息，包括但不仅限于其发生的任何错误或遗漏；或是由于使用通过APP服务发布、私信、传达、其他方式所释出的或在别处传播的信息，而造成的任何损失或伤害，应由相关行为主体承担全部责任。

                    {'\n'}{'\n'}7.3 鉴于外部链接指向的网页内容非扑客平台实际控制的，因此扑客平台无法保证为向用户提供便利而设置的外部链接的准确性和完整性。

                    {'\n'}{'\n'}7.4 对于因不可抗力或扑客平台不能控制的原因造成的APP服务中断或其它缺陷，扑客平台不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。

                    {'\n'}{'\n'}7.5 用户同意，对于扑客平台向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，扑客平台无需承担任何责任：
                    {'\n'}7.5.1 扑客平台向用户免费提供的APP服务；
                    {'\n'}7.5.2 扑客平台向用户赠送的任何产品或者服务；
                    {'\n'}7.5.3 扑客平台向收费微博服务用户附赠的各种产品或者服务。

                    {'\n'}{'\n'}7.6
                    用户知悉并同意，扑客平台可能会与第三方合作向用户提供产品（包括但不限于游戏、第三方应用等）并由第三方向用户提供该产品的升级、维护、客服等后续工作，由该等第三方对该产品的质量问题或其本身的原因导致的一切纠纷或用户损失承担责任，用户在此同意将向该第三方主张与此有关的一切权利和损失。

                    {'\n'}{'\n'}7.7
                    APP平台上提供的产品或服务（包括但不限于游戏物品及道具），如未标明使用期限、或者其标明的使用期限为“永久”、“无限期”或“无限制”的，则其使用期限为自用户获得该游戏物品或道具之日起至该产品或服务在APP下线之日为止。由扑客平台原因导致的本协议终止或者该产品或服务在APP下线时，用户将无法继续使用该产品或服务，扑客平台将该用户剩余虚拟货币退还用户的虚拟货币账户或向受影响的用户提供等值的替代性的收费网络服务。
                    {'\n'}{'\n'}8. 违约赔偿

                    {'\n'}8.1如因扑客平台违反有关法律、法规或本协议项下的任何条款而给用户造成损失，扑客平台同意承担由此造成的损害赔偿责任。

                    {'\n'}{'\n'}8.2用户同意保障和维护扑客平台及其他用户的利益，如因用户违反有关法律、法规或本协议项下的任何条款而给扑客平台或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。
                    {'\n'}{'\n'}9. 协议修改

                    {'\n'}{'\n'}9.1
                    扑客平台有权随时修改本协议的任何条款，一旦本协议的内容发生变动，扑客平台将会在APP上公布修改之后的协议内容，若用户不同意上述修改，则可以选择停止使用APP服务。扑客平台也可选择通过其他适当方式（比如系统通知）向用户通知修改内容。

                    {'\n'}{'\n'}9.2 如果不同意扑客平台对本协议相关条款所做的修改，用户有权停止使用APP服务。如果用户继续使用APP服务，则视为用户接受扑客平台对本协议相关条款所做的修改。
                    {'\n'}{'\n'}10. 通知送达

                    {'\n'}10.1 本协议项下扑客平台对于用户所有的通知均可通过网页公告、电子邮件、系统通知、APP管理帐号主动联系、私信、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。

                    {'\n'}{'\n'}10.2用户对于扑客平台的通知应当通过扑客平台对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。
                    {'\n\n'}11. 法律适用

                    {'\n'}11.1
                    APP依据并贯彻中华人民共和国法律法规、政策规章及司法解释之要求，包括但不限于《全国人民代表大会常务委员会关于加强网络信息保护的决定》、《最高人民法院最高人民检察院适用法律若干问题的解释》等文件精神，制定《
                    APP服务使用协议 》。

                    {'\n'}{'\n'}11.2 本协议的订立、执行和解释及争议的解决均应适用中国法律并受中国法院管辖。

                    {'\n'}{'\n'}11.3 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向扑客平台所在地的人民法院提起诉讼。
                    {'\n\n'}12. 其他规定

                    {'\n'}12.1 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。

                    {'\n'}{'\n'}12.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。

                    {'\n'}{'\n'}12.3 本协议中的标题仅为方便而设，在解释本协议时应被忽略。

                </Text> : <View>
                    <Text style={{margin: 20}}>
                        {'\n'}Poker APP Service Usage Agreement{'\n'}
                        {'\n'}1. Firstly notes

                        {'\n\n'}1.1 Shenzhen De Shang Quan Cai Sports & Cultural Media Co., Ltd(hereinafter collectively
                        referred to as
                        "Desh") a and related enterprises (hereinafter collectively referred to as "PokerPro") agrees to
                        provide PokerPro services (hereinafter referred to as "APP services") based on mobile network,
                        according to this agreement and released operation regulations. For attaining APP services, its
                        users (hereinafter referred to as the "user") should know all the contents of this agreement and
                        thinking independently before recognizing and agreeing all terms of this agreement and complete
                        registration processes in accordance with the instructions on the page. Users click "Agree"
                        button
                        in the registration process means that user fully accept "The PokerPro Internet Service
                        Agreement",
                        "APP Service Usage Agreement", "APP Community Convention (Trial)", rules and regulations
                        published
                        on PokerPro.

                        {'\n\n'}1.2 After successful registration, PokerPro will provide APP service according to the
                        account
                        registration information. While users’ application and registration for APP service should base
                        on
                        objective needs. Users have the right to use APP service, after registration and agreeing.
                        User’s
                        account and password should be own-kept; During using APP service, users should take full
                        responsibility for APP usage, for any information released and published by users through APP
                        service, and for any consequences because of that. Information submitted, released or displayed
                        by
                        users will be visible to other APP users and the third party services and websites (users have
                        accessibility of their own information by setting).

                        {'\n\n'}1.3 For enhancing user's APP experience, users agree PokerPro has the rights to
                        investigate,
                        research
                        and analyze users’ data basing on the user's operating behaviors, to further optimize APP
                        service.
                        Content

                        {'\n\n'}2.1 PokerPro service content depends on real situation, including but not limited,
                        authorized users
                        through their account, published views, comments, and pictures on APP. PokerPro has the right to
                        upgrade or to adjust services or representation form, and will inform users in time.

                        {'\n\n'}2.2 Some services on PokerPro may be charged and needed to pay online. For charged
                        network
                        services,
                        users will receive a clear notification before using. Only having users’ confirmation that he is
                        willing to pay related costs, can user use the charged network service. If being refused, then
                        the
                        platform has the right not to provide such charged network services.

                        {'\n\n'}2.3 Users understand that PokerPro only provide technical services, or related to it.
                        Additional network
                        services equipment (such as personal computer, mobile phone, and other related network devices)
                        and
                        required for Internet access (such as payments of telephone bill and mobile phone fees and
                        expenses
                        of surfing Internet) shall be burden by users.
                        {'\n\n'}3. Service modified, interrupted or terminated
                        {'\n\n'}3.1
                        Considering particularity of network service (including but not limited, server’s stability,
                        hacker
                        attacking online and other beyond-controlled situation). User agree that PokerPro has the right
                        to
                        suspend or terminate part or all APP service, without any prior notification (including charged
                        network service). If unexpected situation does happen, PokerPro shall manage to inform affected
                        users through system notification, private messages, SMS or other reasonable ways. If charged
                        service being suspended or terminated, PokerPro shall return charged virtual currency into
                        related
                        virtual account or provide an equivalent, alternative charged network service instead.

                        {'\n\n'}3.2 Users understand that PokerPro or related equipment have regular or irregular
                        maintenance (mobile
                        network, etc.). If service maintenance happens within a controlled time period for reasonable
                        reasons, PokerPro take no responsibility, but PokerPro shall inform users in advance possibly.

                        {'\n\n'}3.3 In any following circumstances, PokerPro has the right to suspend or terminate APP
                        services
                        (including charging services) for users at any time and should take no responsibility to users
                        or
                        any third party :
                        {'\n'}3.3.1 Unreal personal information provided;
                        {'\n'}3.3.2 Break laws, regulations, national policies or rules in this agreement;
                        {'\n'}3.3.3 Unpaid APP charged services.

                        {'\n'}3.4 If users don’t actually use the APP service within 90 consecutive days after
                        successfully
                        registered, PokerPro has the right to choose any of the following to determinate service:
                        {'\n'}3.4.1 Take back user’s nickname;
                        {'\n'}3.4.2 Take back user’s accounts or stop providing APP services.

                        {'\n'}{'\n'}3.5 After User binding APP account with third party account, except unbinding by
                        user
                        himself, in any
                        following circumstances, PokerPro take no responsibility to user or the third party:
                        {'\n'}3.5.1 Break laws, regulations, national policies, this agreement or "PokerPro APP Service
                        Usage
                        Agreement";
                        {'\n'}3.5.2 Break third party Account User Agreement or its relevant regulations;
                        {'\n'}3.5.3 Other circumstance.
                        {'\n'}Usage Rules

                        {'\n'}{'\n'}4.1 Register APP account, to compose, to publish, to spread should use real ID and
                        personal information.
                        {'\n'}False, fraudulent residential ID, business license is unaccepted; If user's personal data
                        has
                        any
                        changes, profile in APP should be updated timely.

                        {'\n'}{'\n'}4.2 Users can edit own profile, like account name, head-photo, etc. all registration
                        information, but
                        they should follow the "Seven Bottom Line" and relevant regulations, and shall not contain
                        illegal
                        or unethical information.

                        {'\n'}{'\n'}4.3 Breaking any rules above, PokerPro has the right to reject registration, to
                        inform
                        user correct
                        information within limited time, to take back user’s account, to suspend or terminate APP
                        service
                        etc., according to the relevant laws, regulations and national policy. If user register with
                        counterfeit, PokerPro has the right to cancel the user's account and reports to Network
                        Supervision
                        Bureau.

                        {'\n'}{'\n'}4.4 PokerPro shall complete information safety system and preventive measure and
                        shall
                        protect users
                        private profile after registration.

                        {'\n'}{'\n'}4.5 As APP service is based on user’s account, user should not transfer or lend his
                        account ID, password
                        to others. If found account information was stolen, user should inform PokerPro immediately.
                        PokerPro shall take no responsibility for the illegal use by hacker or user’s improper password
                        keeping.

                        {'\n'}{'\n'}4.6 Users agree that PokerPro puts all kinds of commercial advertisement or business
                        information in a
                        variety of ways during providing APP services. And users agree to accept PokerPro to send
                        commodity
                        sales or other related business information by e-mail or other ways to users.

                        {'\n'}{'\n'}4.7 Users know, understand and agree to authorize PokerPro and its associated
                        company
                        can re-use content
                        which being released through APP, including but not limited, text, pictures, video, etc.

                        {'\n'}{'\n'}4.8 Using APP services, users should behave civilized, and respect other people's
                        rights
                        of personality
                        and identity according to law, and establish a harmonious, civilized and polite network social
                        environment.

                        {'\n\n'}4.9 Users must obey the following principles while attaining APP service:
                        {'\n'}4.9.1 Shall not violate People's Republic of China’s law and regulations and relevant
                        international
                        treaties or rules;
                        {'\n'}4.9.2 Shall not violate protocols relating to network services, APP services, regulations,
                        procedures, and industry rules;
                        {'\n'}4.9.3 Shall not violate the "Seven Bottom Line" requirements of laws, regulations, the
                        socialist
                        system, national interests, the legitimate rights and interests of citizens, public order,
                        social
                        morality, and information authenticity;
                        {'\n'}4.9.4 Shall not carry out any act that may adversely affect normal functioning of the
                        Internet
                        or
                        mobile network;
                        {'\n'}4.9.5 Shall not upload, display or transmit any false, imitated, slanderous, aggressive,
                        abusive,
                        threatening, racially discriminatory information, and information about harassment, slander,
                        breach
                        of privacy, adult erotic, and malicious plagiarism or any other illegal information;
                        {'\n'}4.9.6 Shall not infringe in any way patent, copyright, trademark and other intellectual
                        property
                        rights, or right of name, of reputation, honor right, portrait right, privacy and other personal
                        rights, or any other legitimate rights and interests enjoyed by any people according to law;
                        {'\n'}4.9.7 Shall not in any way infringe upon the rights and/or interests of Desh or APP
                        company or
                        make
                        any act that is detrimental to PokerPro;
                        {'\n'}4.9.8 Shall not engage in any acts that affect normal operation of the APP platform or
                        destroy
                        management model or acts that is harmful to APP platform ecology.
                        {'\n'}4.9.9 Shall not use APP services for any other illegal purpose.
                        {'\n'}{'\n'}4.10 Any statement, notifications, warnings and other content shall be regarded as a
                        part of this
                        agreement through a variety of ways on PokerPro (including but not limited, system notification,
                        private messages, SMS alerts, etc.). If users use such APP service, it is deemed that users
                        agree
                        the content of statements, notices, warning.
                        {'\n'}{'\n'}4.11 PokerPro has the right to review, supervise and handle behavior and information
                        after users
                        using APP service, including but not limited, user’s information (account information, personal
                        profile, etc.) published content (location, text, pictures, audio, video, trademarks, patents,
                        publications, etc.), to user’s behavior (construction relationship, @information, comments and
                        private messages, participated topic and activities, marketing information publication,
                        complaints
                        etc.) etc. If APP company finds out, or receives reports or complaints from third party that
                        users
                        violate the 4th usage rules of this agreement when they use APP services, PokerPro or its
                        authorized
                        subject has the right to make request to users, based on reasonable judgment:
                        A. Make correction within a limited time;
                        B. Takes all necessary measures to mitigate or eliminate bad effects to users without prior
                        notice,
                        then inform users after well-handled. All above necessary measures, includes but not limited,
                        changing, shielding, or deleting related content, warning illegal account, restricting or
                        prohibiting some or all features of illegal account, pausing, terminating, canceling users’
                        using
                        right of APP service, etc.

                        {'\n'}{'\n'}4.12 If found other users to upload illegal content during using APP services, users
                        can
                        directly click
                        "report" button and it will be verified and handled as soon as possible. If it involves the
                        treatment of personal name , right of name, right of reputation or honor, portrait right,
                        privacy
                        and other personal rights disputes , according to "Regulations of the Supreme People's Court on
                        the
                        trial of using information network to infringement of personal rights and such civil dispute
                        cases”,
                        please refer to the published files to handle; If users think above methods can’t solve the
                        problems
                        encountered, or users think it is necessary to seek help from the judicial and administrative
                        authorities, please send feedback to relevant authorities as soon as possible, and PokerPro will
                        cooperate for investigation and get evidence in accordance with the law.
                        {'\n'}{'\n'}5. Intellectual property rights

                        {'\n'}{'\n'}5.1 The PokerPro platform has ownership and intellectual property rights.

                        {'\n'}{'\n'}5.2 The PokerPro platform has ownership and intellectual property rights to its
                        products. Above APP
                        product refers to the PokerPro, or its affiliated company, or its authorized subject etc.
                        through
                        the APP platform, providing users, includes but not limited, with information sharing,
                        relationship
                        chain development, convenient auxiliary tool, application platform, public open platform and
                        other
                        functions, software, service etc.

                        {'\n'}{'\n'}5.3 The PokerPro platform has ownership and intellectual property rights to PokerPro
                        products and all
                        information in it. Above information includes but not limited, its program code, interface
                        design,
                        layout framework, data, accounts, text, pictures, charts, graphics, audio and video, except
                        relevant
                        authorized people, in accordance with the laws and regulations.

                        {'\n'}{'\n'}5.4 During using PokerPro, users may use functions, software or services developed
                        by
                        the third party
                        for APP service and operated on APP platform. In addition to complying with the relevant
                        provisions
                        of this agreement, users shall also comply with the relevant provisions of the third party, and
                        respect the relevant authorized people from third party to its function, software and services
                        and
                        the contents.

                        {'\n'}{'\n'}5.5 As above, users understand and agree:
                        {'\n'}5.5.1 Without approval of PokerPro and related authorized people, users shall not reverse
                        engineer,
                        decompile or disassemble to functions, software and services; At the same time, users shall not
                        directly or indirectly release, broadcast content or information in any media. And users shall
                        not
                        rewrite or reissue, in purpose of broadcasting or issuing, or for any other purpose.
                        {'\n'}5.5.2 On the premise of making reasonable efforts in business, PokerPro shall not take any
                        responsibility to the customer or any third party in any form for the function, software, and
                        service, and delays, inaccuracies, errors or omissions of its content or any damage it caused;
                        {'\n'}5.5.3 PokerPro shall not take any guaranteed or joint undertaking or guarantee for any of
                        the
                        above
                        function, software, services or content provided by the third party. Dispute, argument or
                        damage,
                        caused by above, should be solved by users and the third party. PokerPro take no responsibility
                        for
                        it;
                        {'\n'}5.5.4 To better maintain the ecology for APP, PokerPro reserved PokerPro disposal of the
                        product or
                        the content with ownership and intellectual property rights in any way, any time, including but
                        not
                        limited, the revision, shielding, deleting or any other disposal permitted by laws and
                        regulations.
                        {'\n'}{'\n'}6. Privacy Protection

                        {'\n'}{'\n'}6.1 "Privacy" refer in this agreement includes "telecommunications and Internet
                        users'
                        personal
                        information protection regulations" the fourth article on personal information, "Provisions of
                        the
                        Supreme People's Court on the trial of usage of information network to infringement of personal
                        rights dispute cases in civil law applicable to a number of issues" the twelfth article on
                        personal
                        privacy, the clearly defined privacy formulated or revised laws and regulations from time to
                        time in
                        the future.

                        {'\n'}{'\n'}6.2 To protect user’s privacy and other personal information is a basic policy of
                        PokerPro platform.
                        PokerPro guarantees that we won’t use individuals’ registration information and their private
                        contents stored after using APP services for any illegal purpose. PokerPro will ensure each
                        user’s
                        registration information for commercial use, and we will obtain users’ consent in advance,
                        except
                        the following circumstances:
                        {'\n'}6.2.1 Obtain user's explicit authorization in advance;
                        {'\n'}6.2.2 To maintain social public interests;
                        {'\n'}6.2.3 Schools, scientific research institutions and other institutions basing on public
                        interests
                        for academic research or statistical purposes, written consent by natural people, and publicly
                        is
                        not enough to identify any specific person;
                        {'\n'}6.2.4 Personal information publicly post online by users themselves, or other legally
                        public
                        personal information;
                        {'\n'}6.2.5 Personal information obtained through legal channels;
                        {'\n'}6.2.6 Users infringe upon the legitimate rights and interests of APP or the PokerPro, to
                        safeguard
                        lawful rights and interests when necessary within reasonable range;
                        {'\n'}6.2.7 According to requirements of the relevant government authorities;
                        {'\n'}6.2.8 According to the requirements of relevant laws, regulations or policies;
                        {'\n'}6.2.9 Other necessary situation.

                        {'\n'}{'\n'}6.3 To enhance quality of APP service, PokerPro may cooperate with third party to
                        provide relevant APP
                        services together. The cooperation may need to, including but not limited, exchange of users’
                        data.
                        In that case, users understand and agree that if the third party agrees to bear the same
                        responsibility of protecting the privacy of users, then PokerPro has the right to provide user
                        registration information, etc. to the third party, and agrees with third party that users’ data
                        is
                        only for the purpose of the cooperation of APP services; and PokerPro will conduct supervision
                        and
                        administration on the behavior that the third party uses users’ data , and make all reasonable
                        efforts to protect the safety of users' personal information.
                        {'\n'}{'\n'}7. Disclaimer

                        {'\n'}7.1 During using APP services, users should abide by the laws, regulations and
                        policies of the state,
                        and any consequences of using APP services shall be burden by the users themselves.

                        {'\n'}{'\n'}7.2 Any information released and any point passed through APP service does not
                        represent
                        PokerPro’s
                        views. PokerPro platform is not responsible for its integrity, authenticity, accuracy or
                        reliability. Users may be exposed to the illegal, unethical, incorrect or other improper
                        information, and should make their own judgment on the misclassified or deceptive release
                        content.
                        In any case, for any information, including but not limited, any occurred errors or omissions;
                        or
                        any loss or damage caused by using the information released by publication, private messages,
                        communication, other ways or spread elsewhere through the APP service, the relevant behavior
                        body
                        takes full responsibility.

                        {'\n'}{'\n'}7.3 Because of external links is not actually controlled by the PokerPro, it can’t
                        guarantee the
                        accuracy and integrity of the external link.

                        {'\n'}{'\n'}7.4 PokerPro platform doesn’t take any responsibility for the interruption of APP
                        service or other
                        defects caused by force majeure or beyond the control of it, but will do best to reduce losses
                        and
                        impacts on the users.

                        {'\n'}{'\n'}7.5 The user agrees that the PokerPro doesn’t need to take any responsibility for
                        the
                        quality defects of
                        the following products or services provided to users and any losses initiated:
                        {'\n'}7.5.1 PokerPro offers free APP services to users;
                        {'\n'}7.5.2 Any product or service presented to users by PokerPro;
                        {'\n'}7.5.3 A variety of complimentary products or services provided by PokerPro to charged
                        service
                        users.

                        {'\n'}{'\n'}7.6 Users understand and agree that PokerPro may cooperate with a third party to
                        provide
                        products
                        (including but not limited, game, third party applications etc.) to users. And product’s
                        upgrades,
                        maintenance, customer service and other follow-up work shall be provided by third party. The
                        third
                        party takes responsibility for all disputes caused by quality of the product or the reason of
                        itself
                        or the losses of its users. Users hereby agrees to hold all rights and losses relating to the
                        third
                        party.

                        {'\n'}{'\n'}7.7 Products or services provided by APP platform (including but not limited, game
                        items
                        and props). If
                        the life span is not indicated, or its life span is marked "permanent" and "indefinite" or "no
                        limit", its life span is from the day when users get the game item or props until the day when
                        product or service in APP is offline. This Agreement terminates caused by PokerPro or the
                        product or
                        service in APP is offline. Users will not be able to continue to use the product or service
                        after
                        APP offline. PokerPro will return surplus virtual currency refund to user’s virtual currency
                        account
                        or provide the equivalent alternative charging network service for the affected users.
                        {'\n'}{'\n'}8. Liquidated Damages

                    </Text>
                    <Text style={{margin: 20}}>
                        {'\n'}8.1 If PokerPro causes any losses to users due to violation of relevant laws, regulations
                        or
                        any of the
                        provisions of this agreement, the PokerPro agrees to undertake the liability for damages.

                        {'\n'}{'\n'}8.2 Users agrees to safeguard and maintain the interests of PokerPro and other
                        users. If
                        users violate
                        relevant laws, regulations or any provisions under this agreement, and cause damage to PokerPro
                        or
                        any other third party, users agrees to undertake the liability for damages.
                        {'\n'}{'\n'}9. Protocol Modification

                        {'\n'}9.1 PokerPro has the right to modify any terms of this agreement at any time. Once
                        modified,
                        PokerPro
                        will publish the modified protocol contents on APP. If users not agree with above changes, they
                        can
                        choose to stop using APP service. PokerPro can also choose other appropriate ways, (such as
                        system
                        notifications) to inform users of modified contents.

                        {'\n'}{'\n'}9.2If users not agree to the modifications made by the PokerPro for relevant terms
                        and
                        conditions of
                        this agreement, he has the right to stop using APP services. If users continue using APP
                        service, it
                        is deemed that users accept the modifications made by the PokerPro regarding the terms and
                        conditions of this agreement.
                        {'\n'}{'\n'}10. Notification Service

                        {'\n'}10.1 Under this agreement, for all users’ notification, PokerPro takes the initiative to
                        contact through
                        the web page, email, system notification and APP management account, the private messages,
                        mobile
                        phone messages or regular mail delivery manner; The notice sent is deemed to have been delivered
                        to
                        the recipient.

                        {'\n'}{'\n'}10.2 User's should take notification from official PokerPro platform as
                        communication
                        address, fax number
                        and e-mail address and other contact information.
                        {'\n'}{'\n'}11. Application of law

                        {'\n'}11.1 APP carry out the requirements of the laws and regulations of People's Republic of
                        China,
                        policies
                        and judicial interpretations, including but not limited，the "National People's Congress Standing
                        Committee on Strengthening the Network Information Protection Decision", "Several Issues
                        Interpretation of the Supreme People's court and Supreme People's Procuratorate Concerning the
                        Application of Law" and the spirit of the document, making "APP Service Usage Agreement".

                        {'\n'}{'\n'}11.2 The conclusion, execution and interpretation of this Agreement and settlement
                        of
                        disputes shall
                        apply to the jurisdiction of People’s Republic of China’s laws and the People’s Republic of
                        China’s
                        courts.

                        {'\n\n'}11.3 Any dispute over the contents of the agreement or the execution, both parties shall
                        try to settle as
                        amicable as possible. Any party may lodge a lawsuit to the people's court in municipality in
                        which
                        PokerPro is when negotiations fail.
                        {'\n'}{'\n'}12. Other Provisions

                        {'\n'}12.1 This agreement constitutes a complete agreement between the parties on the agreed
                        items
                        and other
                        relevant matters. Except rules and regulations of this agreement, other rights of other parties
                        are
                        not granted.

                        {'\n'}{'\n'}12.2 Any provisions of this agreement, no matter what reason, wholly or partially
                        invalid or no executive
                        force, left provisions shall be valid and working in this Agreement.

                        {'\n'}{'\n'}12.3 The title in this agreement is only for convenience and shall be omitted
                        whenever
                        comes into explanation.
                    </Text>
                </View>}


            </ScrollView>
        </View>)
    }
}