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
        
        const elementClientRect = element.getBoundingClientRect();
        const tipClientRect = tip.getBoundingClientRect();
        
        const widthElement = elementClientRect.width;
        const topPostionElement = elementClientRect.top + topPositionWindow;
        const bottomPostionElement = elementClientRect.bottom + topPositionWindow;
        const leftPositionElement = elementClientRect.left + leftPositionWindow;
        
        const widthTip = tipClientRect.width;
        const heightTip = tipClientRect.height;
        const leftPositionTip = Math.round(leftPositionElement + (widthElement / 2) - (widthTip / 2));
        const bottomPositionTip = Math.round(bottomPostionElement + 10);
        const topPositionTip = Math.round(topPostionElement - heightTip - 10);
        
        const tipIsOutsideTheWindow = (leftPositionElement + widthElement) < widthTip;
        
        if(topPositionWindow > topPositionTip) {
            tip.style.top = `${bottomPositionTip}px`;
        } else {
            tip.style.top = `${topPositionTip}px`;
        }
        
        if(tipIsOutsideTheWindow) {
            tip.style.left = '0px';
        } else {
            tip.style.left = `${leftPositionTip}px`;
        }
    }
    
    function hasTip(element) {
        return element.dataset.tip !== undefined;
    }
    
    function showTip(e) {
        const target = e.target;
        if(hasTip(target)) {
            const tip = document.querySelector('.minitip');
            
            tip.textContent = target.dataset.tip;
            
            tip.classList.add('minitip_visible');
            
            tip.setAttribute('aria-hidden', 'false');
            
            setPositionTip(target, tip);
        }
    }
    
    function hideTip(e) {
        const target = e.target;
        if(hasTip(target)) {
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