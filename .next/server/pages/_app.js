/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context/AuthContext.tsx":
/*!*************************************!*\
  !*** ./src/context/AuthContext.tsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/supabaseClient */ \"./src/lib/supabaseClient.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__]);\n_lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    user: null,\n    isPremium: false,\n    loading: true\n});\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isPremium, setIsPremium] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const getSession = async ()=>{\n            const { data: { session } } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.getSession();\n            setUser(session?.user ?? null);\n            // TEMP: assume non-premium unless proven\n            setIsPremium(false);\n            setLoading(false); // 🔥 THIS WAS MISSING\n        };\n        getSession();\n        const { data: { subscription } } = _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.onAuthStateChange((_event, session)=>{\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        return ()=>subscription.unsubscribe();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            isPremium,\n            loading\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Milind Parikh\\\\Desktop\\\\My saas calculator\\\\src\\\\context\\\\AuthContext.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9BdXRoQ29udGV4dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUU7QUFDdEI7QUFRakQsTUFBTUssNEJBQWNMLG9EQUFhQSxDQUFrQjtJQUNqRE0sTUFBTTtJQUNOQyxXQUFXO0lBQ1hDLFNBQVM7QUFDWDtBQUVPLFNBQVNDLGFBQWEsRUFBRUMsUUFBUSxFQUFpQztJQUN0RSxNQUFNLENBQUNKLE1BQU1LLFFBQVEsR0FBR1IsK0NBQVFBLENBQU07SUFDdEMsTUFBTSxDQUFDSSxXQUFXSyxhQUFhLEdBQUdULCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ0ssU0FBU0ssV0FBVyxHQUFHViwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNWSxhQUFhO1lBQ2pCLE1BQU0sRUFDSkMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsRUFDbEIsR0FBRyxNQUFNWix5REFBUUEsQ0FBQ2EsSUFBSSxDQUFDSCxVQUFVO1lBRWxDSCxRQUFRSyxTQUFTVixRQUFRO1lBRXpCLHlDQUF5QztZQUN6Q00sYUFBYTtZQUViQyxXQUFXLFFBQVEsc0JBQXNCO1FBQzNDO1FBRUFDO1FBRUEsTUFBTSxFQUNKQyxNQUFNLEVBQUVHLFlBQVksRUFBRSxFQUN2QixHQUFHZCx5REFBUUEsQ0FBQ2EsSUFBSSxDQUFDRSxpQkFBaUIsQ0FBQyxDQUFDQyxRQUFRSjtZQUMzQ0wsUUFBUUssU0FBU1YsUUFBUTtZQUN6Qk8sV0FBVztRQUNiO1FBRUEsT0FBTyxJQUFNSyxhQUFhRyxXQUFXO0lBQ3ZDLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDaEIsWUFBWWlCLFFBQVE7UUFBQ0MsT0FBTztZQUFFakI7WUFBTUM7WUFBV0M7UUFBUTtrQkFDckRFOzs7Ozs7QUFHUDtBQUVPLFNBQVNjO0lBQ2QsT0FBT3ZCLGlEQUFVQSxDQUFDSTtBQUNwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JlYW0tY2FsY3VsYXRvci1zYWFzLy4vc3JjL2NvbnRleHQvQXV0aENvbnRleHQudHN4PzZlZTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi9saWIvc3VwYWJhc2VDbGllbnRcIjtcclxuXHJcbnR5cGUgQXV0aENvbnRleHRUeXBlID0ge1xyXG4gIHVzZXI6IGFueTtcclxuICBpc1ByZW1pdW06IGJvb2xlYW47XHJcbiAgbG9hZGluZzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFR5cGU+KHtcclxuICB1c2VyOiBudWxsLFxyXG4gIGlzUHJlbWl1bTogZmFsc2UsXHJcbiAgbG9hZGluZzogdHJ1ZSxcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcclxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xyXG4gIGNvbnN0IFtpc1ByZW1pdW0sIHNldElzUHJlbWl1bV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBnZXRTZXNzaW9uID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgZGF0YTogeyBzZXNzaW9uIH0sXHJcbiAgICAgIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKTtcclxuXHJcbiAgICAgIHNldFVzZXIoc2Vzc2lvbj8udXNlciA/PyBudWxsKTtcclxuXHJcbiAgICAgIC8vIFRFTVA6IGFzc3VtZSBub24tcHJlbWl1bSB1bmxlc3MgcHJvdmVuXHJcbiAgICAgIHNldElzUHJlbWl1bShmYWxzZSk7XHJcblxyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTsgLy8g8J+UpSBUSElTIFdBUyBNSVNTSU5HXHJcbiAgICB9O1xyXG5cclxuICAgIGdldFNlc3Npb24oKTtcclxuXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGRhdGE6IHsgc3Vic2NyaXB0aW9uIH0sXHJcbiAgICB9ID0gc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZSgoX2V2ZW50LCBzZXNzaW9uKSA9PiB7XHJcbiAgICAgIHNldFVzZXIoc2Vzc2lvbj8udXNlciA/PyBudWxsKTtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHVzZXIsIGlzUHJlbWl1bSwgbG9hZGluZyB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcclxuICByZXR1cm4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzdXBhYmFzZSIsIkF1dGhDb250ZXh0IiwidXNlciIsImlzUHJlbWl1bSIsImxvYWRpbmciLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInNldFVzZXIiLCJzZXRJc1ByZW1pdW0iLCJzZXRMb2FkaW5nIiwiZ2V0U2Vzc2lvbiIsImRhdGEiLCJzZXNzaW9uIiwiYXV0aCIsInN1YnNjcmlwdGlvbiIsIm9uQXV0aFN0YXRlQ2hhbmdlIiwiX2V2ZW50IiwidW5zdWJzY3JpYmUiLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/context/AuthContext.tsx\n");

/***/ }),

/***/ "./src/lib/supabaseClient.ts":
/*!***********************************!*\
  !*** ./src/lib/supabaseClient.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__]);\n_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst supabaseUrl = \"https://fmemkdlrgggdwtphwrys.supabase.co\";\nconst supabaseAnonKey = \"REPLACE_WITH_ANON_KEY\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL3N1cGFiYXNlQ2xpZW50LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXFEO0FBRXJELE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxrQkFBa0JILHVCQUF5QztBQUUxRCxNQUFNSyxXQUFXUCxtRUFBWUEsQ0FBQ0MsYUFBYUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmVhbS1jYWxjdWxhdG9yLXNhYXMvLi9zcmMvbGliL3N1cGFiYXNlQ2xpZW50LnRzP2Y5ZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xyXG5cclxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhO1xyXG5jb25zdCBzdXBhYmFzZUFub25LZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSE7XHJcblxyXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUFub25LZXkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsInN1cGFiYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/lib/supabaseClient.ts\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AuthContext */ \"./src/context/AuthContext.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_ui_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/ui.css */ \"./src/styles/ui.css\");\n/* harmony import */ var _styles_ui_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_ui_css__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__]);\n_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Milind Parikh\\\\Desktop\\\\My saas calculator\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Milind Parikh\\\\Desktop\\\\My saas calculator\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ3NEO0FBRXZCO0FBQ0w7QUFFWCxTQUFTQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELHFCQUNFLDhEQUFDSCw4REFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iZWFtLWNhbGN1bGF0b3Itc2Fhcy8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcclxuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvQXV0aENvbnRleHRcIjtcclxuXHJcbmltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi9zdHlsZXMvdWkuY3NzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8QXV0aFByb3ZpZGVyPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICA8L0F1dGhQcm92aWRlcj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJBdXRoUHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/ui.css":
/*!***************************!*\
  !*** ./src/styles/ui.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@supabase/supabase-js");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();