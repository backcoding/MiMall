export default {
  sevaUserName(context, username) {
    context.commit('sevaUserName', username)
  },
  saveCartCount(context, count) {
    context.commit('saveCartCount', count);
  }
}