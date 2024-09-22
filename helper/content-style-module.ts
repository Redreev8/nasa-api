export default (name: string) => `@import '@/style/root';
@import '@/style/mixin/all';

.${name} {}
`