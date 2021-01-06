class NumberFormatterService{
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    numberAbbreviation(num){
        let cut = 1000;
        let idx = 0;
        while(num/cut>999)
        {
            idx++;
            cut *= 1000;
        }
        switch (idx){
            case 0:
                return `${num/cut}k`;
            case 1:
                return `${num/cut}m`;
            case 2:
                return `${num/cut}b`;
        }
    }
}

const numberFormatter = new NumberFormatterService();
export default numberFormatter;
