// eslint-disable-next-line space-before-function-paren
function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
} export default {
  // eslint-disable-next-line space-before-function-paren
  created() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}
