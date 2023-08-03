# commonJS-ESmodule

## commonjs 와 ESmodule 초기셋팅에 대한 차이에 대한 스터디 레포입니다.

### 1. CommonJS 방식:

CommonJS는 Node.js의 기본 모듈 시스템입니다.
type 필드에 "commonjs"로 설정되면, 해당 프로젝트는 CommonJS 방식으로 모듈을 로드합니다.
CommonJS 방식에서는 require 함수를 사용하여 모듈을 가져옵니다.
모듈은 동기적으로 로드되며, module.exports를 사용하여 모듈의 내보낼 값을 정의합니다.
CommonJS는 동적 로딩 및 트리 쉐이킹과 같은 최적화 기능을 제공하지 않습니다.

### 2. ES Modules 방식:

ES Modules는 ECMAScript 2015(ES6)에서 도입된 표준 모듈 시스템입니다.
type 필드에 "module"로 설정되면, 해당 프로젝트는 ES Modules 방식으로 모듈을 로드합니다.
ES Modules 방식에서는 import 문을 사용하여 모듈을 가져옵니다.
모듈은 비동기적으로 로드되며, export 키워드를 사용하여 모듈의 내보낼 값을 정의합니다.
ES Modules는 정적으로 로딩되므로, 브라우저에서는 동적으로 모듈을 로드하거나 트리 쉐이킹을 수행할 수 있습니다.
ES Modules는 브라우저 및 최신 버전의 Node.js에서 사용할 수 있으나, 이전 버전의 Node.js에서는 실험적인 기능으로 제공됩니다.

따라서, type 필드가 "commonjs"로 설정되면 CommonJS 방식으로 모듈을 로드하고, "module"로 설정되면 ES Modules 방식으로 모듈을 로드합니다.
선택하는 방식은 프로젝트의 환경과 호환성을 고려하여 결정해야 합니다.


추가적으로 babel을 활용하여 ESmodule 방식으로 API를 생성하였습니다. 자세한 내용은 ESmodule-on-babel 디렉토리를 확인해주세요.
