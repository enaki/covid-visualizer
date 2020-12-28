class NumberFormatterService{
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}

const numberFormatter = new NumberFormatterService();
export default numberFormatter;
