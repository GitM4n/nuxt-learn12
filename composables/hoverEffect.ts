export const useHoverEffect = () => {

const flag = ref(false)


function hover(target:HTMLElement){

 target.addEventListener('mouseover', () => flag.value = true)
 target.addEventListener('mouseout', () => flag.value  = false)

}


return {flag, hover}
}
