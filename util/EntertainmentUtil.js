import axios from "axios";

export const pageInformation = {
  TITLE: "KnowQuest",
  SLOGAN: "Feedback Advanced",
};

export const avgRatingsByQuestionId = (ratings, questionId) => {
  let countRating = 0;
  let avgRating;
  let totalRating = 0;
  ratings.map((r) => {
    r.ratings.map((rt) => {
      // Only count ratings of non-zero
      if (rt.questionId === questionId && rt.rating > 0) {
        totalRating += rt.rating;
        countRating += 1;
      }
    });
  });

  // If there are no ratings for this category i.e. a rating of 0, then we do not average it in
  countRating === 0 ? (avgRating = totalRating) : (avgRating = totalRating / countRating);
  return avgRating;
};

export const getAvgRating = (ratings, questions) => {
  let avgRating = 0;
  let totalRating = 0;
  let totAvgRating = 0;
  let count = 0;

  questions.map((q) => {
    totalRating += avgRatingsByQuestionId(ratings, q.questionId || q._id);
    if (avgRatingsByQuestionId(ratings, q.questionId || q._id) > 0) {
      count++;
    }
    return null;
  });

  //avgRating = totalRating / showQuestions.length; -> goes against ALL ratings and not just ratings that exist
  if (count === 0) {
    avgRating = 0;
  } else {
    avgRating = totalRating / count;
  }

  if (ratings.length !== 0) {
    totAvgRating = avgRating;
  } else {
    totAvgRating = 0;
  }
  return totAvgRating * 2;
};

export function getRatingByQuestionId(questionId, latestRatingId, latestRatings, id) {
  let totalRating = 0;
  if (latestRatingId == id) {
    latestRatings.map((rt) => {
      // Only count ratings of non-zero
      if (rt.questionId === questionId && rt.rating > 0) {
        totalRating = rt.rating;
      }
    });
  }
  return totalRating;
}

export async function handleMyProductAddition(productData) {
  const server_url = process.env.REACT_APP_API_URI;

  try {
    const addProductUrl = `${server_url}/addProduct`;

    // eslint-disable-next-line no-unused-vars
    await axios.post(addProductUrl, JSON.stringify(productData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export function calculateColorRating(totAvgRating) {
  if (totAvgRating >= 0 && totAvgRating <= 25) {
    return 0.25;
  } else if (totAvgRating > 25 && totAvgRating <= 50) {
    return 0.5;
  } else if (totAvgRating > 50 && totAvgRating <= 75) {
    return 0.75;
  } else {
    return 1;
  }
}

export const getAvgRecommendBoolean = (ratings) => {
  let countRating = 0;
  let avgRating;
  let totalTrueRating = 0;
  ratings.map((r) => {
    countRating += 1;
    if (r.isRecommended === true) {
      totalTrueRating += 1;
    }
  });
  countRating === 0 ? (avgRating = totalTrueRating) : (avgRating = totalTrueRating / countRating);
  return avgRating;
};