(function() {
    'use strict';
    
    (function(tip) {
        tip.id = 'minitip';
        
        tip.classList.add('minitip');
        
        tip.setAttribute('aria-hidden', 'true');
        tip.setAttribute('role', 'tooltip');
        
        document.body.appendChild(tip);
    })(document.createElement('span'));
    
    (function(elementsWithTip) {
        elementsWithTip = [].slice.call(elementsWithTip);
        elementsWithTip.forEach((el) => {
            if(el.dataset.tip !== '') {
                el.setAttribute('aria-describedby', 'minitip');
            }
        });
    })(document.querySelectorAll('[data-tip]'));

    function setPositionTip(element, tip) {
        const topPositionWindow = window.scrollY || document.documentElement.scrollTop;
        const leftPositionWindow = window.scrollX || document.documentElement.scrollLeft;
        
        const widthElement = element.getBoundingClientRect().width;
        const topPostionElement = element.getBoundingClientRect().top + topPositionWindow;
        const bottomPostionElement = element.getBoundingClientRect().bottom + topPositionWindow;
        const leftPositionElement = element.getBoundingClientRect().left + leftPositionWindow;
        
        const heightTip = tip.getBoundingClientRect().height;
        const leftPositionTip = Math.round(leftPositionElement + (widthElement / 2));
        const bottomPositionTip = Math.round(bottomPostionElement + 15);
        const topPositionTip = Math.round(topPostionElement - heightTip - 15);
        
        const positionsArrow = ['bottom', 'top', 'left', 'right'];
        
        positionsArrow.forEach((position) => {
            if(tip.classList.contains(`minitip_arrow-${position}`)) {
                tip.classList.remove(`minitip_arrow-${position}`);
            }
        });
        
        if(topPositionWindow > topPositionTip) {
            tip.style.top = `${bottomPositionTip}px`;
            tip.classList.add('minitip_arrow-top');
            
        } else {
            tip.style.top = `${topPositionTip}px`;
            tip.classList.add('minitip_arrow-bottom');
        }
        tip.style.left = `${leftPositionTip}px`;
    }
    
    function showTip(e) {
        const target = e.target;
        if(target.dataset.tip !== undefined) {
            const tip = document.querySelector('.minitip');
            
            tip.textContent = target.dataset.tip;
            
            tip.classList.add('minitip_visible');
            
            tip.setAttribute('aria-hidden', 'false');
            
            setPositionTip(target, tip);
        }
    }
    
    function hideTip(e) {
        const target = e.target;
        if(target.dataset.tip !== undefined) {
            const tip = document.querySelector('.minitip');
            if(tip.classList.contains('minitip_visible')) {
                tip.textContent = '';

                tip.classList.remove('minitip_visible');

                tip.setAttribute('aria-hidden', 'true');
            }
        }
    }
    
    document.addEventListener('mouseover', showTip);
    document.addEventListener('mouseout', hideTip);
    document.addEventListener('focusin', showTip);
    document.addEventListener('focusout', hideTip);
    
})();