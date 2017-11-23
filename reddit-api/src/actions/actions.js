// 同步Action创建函数

// 用户操作
// 选择要显示的subreddit
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

// 刷新subreddit
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

// 网络请求
// 获取指定的subreddit
export const REQUEST_POSTS = 'REQUEST_POSTS';
export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

// 收到请求响应
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receiveAt: Date.now()
  };
}

// 异步action创建函数
// store.dispatch(fetchPosts(subreddit))
export function fetchPosts(subreddit) {
  // thunk middleware 知道如何处理函数
  // 这里把dispatch方法通过参数的形式传递给函数
  // 以此来让它自己也能dispatch action
  return function(dispatch) {
    // 首次dispatch：更新应用的state来通知api请求发起了
    dispatch(requestPosts(subreddit));
    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。
    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
    // 这个return不是必须的
    // dispatch(action)之后会更新应用的state
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。
        dispatch(receivePosts(subreddit, json))
      );
    // 在实际应用中，还需要
    // 捕获网络请求的异常。
  };
}
