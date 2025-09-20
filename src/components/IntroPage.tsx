import React from "react";
import "../styles/IntroPage.css";

const IntroPage: React.FC = () => {
    return (
        <div className="intro-container">
            <header className="intro-header">
                <h1>User Guide 서비스 이용 방법</h1>
            </header>

            {/* ===== 영어 버전 ===== */}
            <section className="intro-card">
                <h2>⚡ No more crowded places!</h2>
                <p>Looking for a ‘less busy area’?</p>
                <p className="kor">복잡한 지역은 그만! ‘덜 붐비는 지역’을 찾고 싶으신가요?</p>
            </section>

            <section className="intro-card">
                <h2>1. Check less crowded areas on the Home screen!</h2>
                <ul>
                    <li><strong>Local Notices</strong>: Provides information on rallies announced by the [Seoul Metropolitan Police Agency].</li>
                    <li><strong>Quiet Spots Nearby</strong>: Recommends nearby quiet spots using data provided by [Seoul City].</li>
                    <li><strong>Favorite Places</strong>: Shows the crowd level of places you’ve bookmarked.</li>
                    <li><strong>Top 5 Busy Places Now</strong>: Provides the real-time Top 5 most crowded places.</li>
                </ul>
                <div className="intro-images two">
                    <img src="/images/section1.png" alt="English Step1 화면1" />
                    <img src="/images/section2.png" alt="English Step1 화면2" />
                </div>
            </section>

            <section className="intro-card">
                <h2>2. You can also check congestion levels on the Map!</h2>
                <ul>
                    <li><strong>Open Seoul</strong>: View congestion levels based on data from [Seoul City]. You can see the crowd levels of 120 key spots in Seoul.</li>
                    <li><strong>On-site Feed</strong>: Check congestion levels reported by users on-site through the [BoomBeam] service.</li>
                    <li><strong>Marker Colors</strong>: Busy = Red / Slightly Busy = Yellow / Normal = Blue / Relaxed = Green</li>
                </ul>
                <div className="intro-images two">
                    <img src="/images/section3.png" alt="English Step2 화면1" />
                    <img src="/images/section4.png" alt="English Step2 화면2" />
                </div>
            </section>

            <section className="intro-card">
                <h2>3. What if congestion data is not available? Ask directly!</h2>
                <ul>
                    <li>On the Community Chat screen, press the Ask button to directly inquire about the congestion level of a place.</li>
                    <li>Enter the location on the Ask screen, and it will be updated in Community Chat – My Questions.</li>
                    <li>Polls created through Community Chat – Vote are only visible to users within a 300m radius of the place, and only those users can vote.</li>
                </ul>
                <div className="intro-images three">
                    <img src="/images/section5.png" alt="English Step3 화면1" />
                    <img src="/images/section6.png" alt="English Step3 화면2" />
                    <img src="/images/section7.png" alt="English Step3 화면3" />
                </div>
            </section>

            {/* ===== 한글 버전 ===== */}
            <section className="intro-card">
                <h2>⚡ 복잡한 지역은 그만!</h2>
                <p>‘덜 붐비는 지역’을 찾고 싶으신가요?</p>
            </section>

            <section className="intro-card">
                <h2>1. 홈 화면에서 덜 붐비는 지역을 확인해보세요!</h2>
                <ul>
                    <li><strong>지역 소식</strong>: [서울경찰청]에서 공지되는 집회 정보를 제공합니다.</li>
                    <li><strong>내 근처 한적한 스팟</strong>: [서울시]에서 제공되는 데이터로 인근 지역의 한적한 스팟을 추천합니다.</li>
                    <li><strong>관심 장소</strong>: 즐겨찾기로 저장한 장소들의 혼잡도가 보여집니다.</li>
                    <li><strong>지금 붐비는 장소 TOP5</strong>: 실시간 붐비는 장소 TOP5를 제공합니다.</li>
                </ul>
                <div className="intro-images two">
                    <img src="/images/section1.png" alt="Korean Step1 화면1" />
                    <img src="/images/section2.png" alt="Korean Step1 화면2" />
                </div>
            </section>

            <section className="intro-card">
                <h2>2. 지도에서도 혼잡도를 확인할 수 있어요!</h2>
                <ul>
                    <li><strong>오픈서울</strong>: 서울시에서 제공되는 데이터로 확인할 수 있습니다. 서울의 핵심 스팟 120곳의 혼잡도가 보입니다.</li>
                    <li><strong>현장피드</strong>: 붐빔 서비스에서 사용자가 입력한 혼잡도를 확인할 수 있습니다.</li>
                    <li><strong>마커 색상</strong>: 붐빔=빨강 / 약간 붐빔=노랑 / 보통=파랑 / 여유=초록</li>
                </ul>
                <div className="intro-images two">
                    <img src="/images/section3.png" alt="Korean Step2 화면1" />
                    <img src="/images/section4.png" alt="Korean Step2 화면2" />
                </div>
            </section>

            <section className="intro-card">
                <h2>3. 만일 혼잡도 정보가 없다면? 직접 질문해보세요!</h2>
                <ul>
                    <li>‘소통방’ 화면에서 ‘질문하기’ 버튼을 눌러 궁금한 장소의 혼잡도를 직접 질문할 수 있습니다.</li>
                    <li>‘질문하기’ 화면에서 장소를 입력하면 해당 장소는 ‘소통방–내 질문’에 업데이트 됩니다.</li>
                    <li>‘소통방 투표하기’의 투표내역은 해당 장소의 300m 반경 내 사용자에게만 보이며, 300m 반경에 위치한 사용자만 투표할 수 있습니다.</li>
                </ul>
                <div className="intro-images three">
                    <img src="/images/section5.png" alt="Korean Step3 화면1" />
                    <img src="/images/section6.png" alt="Korean Step3 화면2" />
                    <img src="/images/section7.png" alt="Korean Step3 화면3" />
                </div>
            </section>

            <footer className="intro-footer">
                <p>© 2025 Boombim Team. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default IntroPage;
