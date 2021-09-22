const resUtil = require("../../util/resUtil");
const { createTinder } = require("../../dataAccess/tinder");
const { getTeamIdbyUserId } = require("../../dataAccess/user");
const topTinder = require("../../dataAccess/topTinder");

const pushTinder = async (req, res) => {
	// i 경기 아이디
	for (let gameId = 271; gameId < 343; gameId++) {
		for (let cnt = 1; cnt < 11; cnt++) {
			const userId = 254 + getRandomInt(1, 11);

			const teamId = await getTeamIdbyUserId(userId);

			const msgNum = getRandomInt(0, tinderMessage.length - 1);

			let body = {
				userId: userId,
				msg: tinderMessage[msgNum].message,
				teamId: teamId,
				gameId: gameId,
				like: gameId - cnt * 13,
			};

			const result = await createTinder(body);
			let tinderId = { id: result.dataValues.id };

			await topTinder.createTopTinder(tinderId, cnt);
		}
	}

	res.json(resUtil.fail(201, "틴더, 탑틴더 생성 굿."));
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const tinderMessage = [
	{ message: "이 판 이기면 플옵 직행임?" },
	{ message: "역체미 페이커" },
	{ message: "벌써 글골 6천 차이네" },
	{ message: "와 이게 안죽네" },
	{ message: "아니 뭐하냐 ㅋㅋㅋㅋㅋㅋ" },
	{ message: "멘탈잡고 빠르게 다음판가자" },
	{ message: "서렌해 그냥" },
	{ message: "잭스 빡캐리 믿기엔 정글 미드가 너무 망했다" },
	{ message: "아펠 eq평에 사라질듯" },
	{ message: '실3원딜 듀오 구합니다. "챌찍을때까지숨참" 친추주세요 ' },
	{ message: "아니 아펠 딜뭐냐고 ㅋㅋㅋㅋㅋ" },
	{ message: "겜 진짜 무기력하네" },
	{ message: "니달리가 범인임" },
	{ message: "서렌이 답이라니까" },
	{ message: "블루팀 운빨 망겜" },
	{ message: "JMT" },
	{ message: "제압골 너무 달아~" },
	{ message: "아니 불리한것도 아닌데 왜 바텀버리고 위로 올라가" },
	{ message: "ㅈㄱㅊㅇㅈㄱㅊㅇㅇㅇㅇ" },
	{ message: "제압 ㅅㅅㅅㅅㅅ" },
	{ message: "이러면 할만하지 않나?" },
	{ message: "준근못" },
	{ message: "영도초 3학년 6반 신민아 사랑해" },
	{
		message:
			"우리나라 대한민국을 대표하는 4팀 담원,젠지,T1,한화생명 모투 폼유지 잘해서 롤드컵에서 좋은 모습을 보여주길 응원합니다. 코로나도 조심하세요!!",
	},
	{
		message:
			"선발전이 이렇게 꿀잼인건 올해가 처음인듯, 또대급 또대급 하는데 매년 역대급이다 Lck 월즈 먹고 드라마 써보자  담젠슼한 화이팅",
	},

	{
		message: "돌고돌아 담젠슼 ㅋㅋㅋㅋ",
	},
	{ message: "오늘은 페이커의 생일입니다. 축하해주세요" },

	{ message: "대 황 슼" },

	{
		message:
			"T1이 롤드컵 못가려면 1. T3 : 젠지 준우승 2. T4 : 젠지 우승만 안하면 3. T1,T2: 롤드컵, T5 : 선발전",
	},

	{ message: "아니 여기 MVP 왜 페이커냐 걍 인기 투표네" },

	{
		message:
			"엄마! 저는 커서 페이커가 될래요!! 엄마! 저는 커서 페이커가 될래요!! 엄마! 저는 커서 페이커가 될래요!!",
	},

	{
		message:
			"마지막 경기까지 최선을 다해준 선수들 너무 고마웠고 앞으로도 꽃길만 걷자 T1 화이팅!!!!",
	},
];

module.exports = pushTinder;
