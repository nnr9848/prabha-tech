package com.prabhatech.service;

import com.prabhatech.dto.HeroConfigDto;
import com.prabhatech.entity.HeroConfig;
import com.prabhatech.exception.ResourceNotFoundException;
import com.prabhatech.repository.HeroConfigRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HeroConfigService {

    private final HeroConfigRepository heroConfigRepository;

    public HeroConfigService(HeroConfigRepository heroConfigRepository) {
        this.heroConfigRepository = heroConfigRepository;
    }

    @Transactional(readOnly = true)
    public HeroConfigDto.Response getHeroConfig() {
        HeroConfig config = heroConfigRepository.findByConfigKey("default_hero")
                .orElseGet(this::createFallbackConfig);
        return mapToResponse(config);
    }

    @Transactional
    public HeroConfigDto.Response updateHeroConfig(HeroConfigDto.Request request) {
        HeroConfig config = heroConfigRepository.findByConfigKey("default_hero")
                .orElseGet(() -> {
                    HeroConfig newConfig = new HeroConfig();
                    newConfig.setConfigKey("default_hero");
                    return newConfig;
                });

        config.setSubHeadline(request.getSubHeadline());
        config.setHeadlinePrefix(request.getHeadlinePrefix());
        config.setHeadlineHighlight(request.getHeadlineHighlight());
        config.setHeadlineSuffix(request.getHeadlineSuffix());
        config.setCtaText(request.getCtaText());
        config.setCtaLink(request.getCtaLink());
        config.setVideoUrl(request.getVideoUrl());
        config.setPosterUrl(request.getPosterUrl());

        HeroConfig saved = heroConfigRepository.save(config);
        return mapToResponse(saved);
    }

    private HeroConfig createFallbackConfig() {
        HeroConfig config = new HeroConfig();
        config.setConfigKey("default_hero");
        config.setSubHeadline("We catalyze business growth by reimagining digital experiences that conquer complex challenges through innovation and agility.");
        config.setHeadlinePrefix("Meet the");
        config.setHeadlineHighlight("Digital Drivers");
        config.setHeadlineSuffix("of Global Disruptors");
        config.setCtaText("Contact Our Experts");
        config.setCtaLink("/contact");
        config.setVideoUrl("https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.mp4");
        config.setPosterUrl("https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.jpg");
        return heroConfigRepository.save(config);
    }

    private HeroConfigDto.Response mapToResponse(HeroConfig entity) {
        return new HeroConfigDto.Response(
                entity.getId(),
                entity.getConfigKey(),
                entity.getSubHeadline(),
                entity.getHeadlinePrefix(),
                entity.getHeadlineHighlight(),
                entity.getHeadlineSuffix(),
                entity.getCtaText(),
                entity.getCtaLink(),
                entity.getVideoUrl(),
                entity.getPosterUrl(),
                entity.getUpdatedAt()
        );
    }
}
