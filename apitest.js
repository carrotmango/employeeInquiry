const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/teamInfo', (req, res) => {
  const nameResult = [];
  const imageResult = [];
  const jobResult = [];

  request('https://www.mindwareworks.com/company/team.do', (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      $('div.thumb').each((i, link) => {
        const name = $(link).find('span').text();
        nameResult.push({ name });
      });
      $('div.thumb-wrap').each((i, link) => {
        const image = `https://www.mindwareworks.com/${$(link).find('img').attr('src')}`;
        imageResult.push({ image });
      });
      $('.company-team-inner li strong').each((i, link) => {
        const job = $(link).text();
        jobResult.push({ job });
      });

      const combined = nameResult.map((item, i) => Object.assign({}, item, imageResult[i], jobResult[i]));

      res.json(combined);
    } else {
      res.status(500).send('Error');
    }
  });
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
