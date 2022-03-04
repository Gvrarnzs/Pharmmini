//? Nomor 1
// let oddNumber = (range) => {
//     for (let i = 0; i < range; i++) {
//         if (i % 2 !== 0){
//             console.log(i)
//         }
//     }
// }
// oddNumber(100)

//? Nomor 2
// let scoreFunc = (nilai) => {
//     if (nilai >= 80){
//         return "Grade A"
//     }else if (nilai <= 79 && nilai >= 60){
//         return "Grade B"
//     }else if (nilai <= 59 && nilai >= 40){
//         return "Grade C"
//     }else {
//         return "Grade D"
//     }
// }
// console.log(scoreFunc(39))

//? Nomor 3 
// var stars = ``
// var rows = 5

// for(let i = 0; i < rows;i++){
//     for(let j=0 ; j < rows - i - 1 ; j++){
//         stars += ` `
//     }
//     for (let k = 0; k < i + 1; k++){
//         stars += `*`
//     }
//     stars +=`\n`
// }
// console.log(stars)

//? Nomor 4
//* 1. sqlQuery = select o.namaObat, ok.kodeObat, o.sisaObat, MAX(jumlahJual) As Palinglaris from tabel_obatkeluar ok join tabel_obat o on ok.kodeObat = o.kodeObat;
//* 2. sqlQuery = select * from tabel_obatkeluar ok join tabel_apoteker a on ok.kodeApoteker = a.kodeApoteker where ok.kodeApoteker = 1;
//* 3. sqlQuery = select * from tabel_obatkeluar where month(tanggalBeli) = 9;
//* 4. sqlQuery = select ok.idTransaksi, ok.kodeObat, ok.jumlahJual, o.sisaObat, ok.tanggalBeli, (o.sisaObat - ok.jumlahJual) as Obatsisa from tabel_obatkeluar ok join tabel_obat o on ok.kodeObat = o.kodeObat;
